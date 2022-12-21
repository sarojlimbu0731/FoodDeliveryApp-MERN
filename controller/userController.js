const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
const { sendEmail } = require('../utils/sendEmail')



exports.addUser = async (req, res) => {
    const { username, email, password } = req.body
    // check email if already registered
    let user = await User.findOne({ email: email })
    if (!user) {
        // if user is not found, create new user
        let user = new User({
            username: username,
            email: email,
            password: password
        })

        // create token for verifying user
        let token = new Token({
            token: crypto.randomBytes(16).toString('hex'),
            user: user._id
        })
        token = await token.save()
        if (!token) {
            return res.status(400).json({ error: "something went wrong" })
        }
       
        const url = `${process.env.FRONTEND_URL}/confirmEmail/${token.token}`
        sendEmail({
            from: "noreply@something.com",
            to: email,
            subject: "Verification Email",
            text: " Please click on the following link or copy paste it in your browser to verify your email." + url,
            html: `<a href='${url}'><button>Verify email.</button></a>`
        })

        user = await user.save()
        if (!user) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        return res.send(user)
    }
    else {
        // if user is found, return error
        return res.status(400).json({ error: "User/Email already exists" })
    }
}


// user verification
exports.userConfirmation = async (req, res) => {
    const token = await Token.findOne({ token: req.params.token })
    if (!token) {
        return res.status(400).json({ error: "Token not found, or may have expired" })
    }
    let user = await User.findById(token.user)
    if (!user) {
        return res.status(400).json({ error: "User not found." })
    }
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified. Login to continue" })
    }
    user.isVerified = true
    user = await user.save()

    if (!user) {
        return res.status(400).json({ error: "something went wrong" })
    }
    return res.status(200).json({ message: "User verified successfully." })
}


// resend confirmation
exports.resendConfirmation = async (req, res) => {
    // check if user email exist or not
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "User/Email does not exist. Please register." })
    }
    // check if user is already verified
    if (user.isVerified) {
        return res.status(400).json({ error: "User already verified. Login to continue" })
    }
    // generate token and send verification email
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }
    // send token in email
    const url = `${process.env.FRONTEND_URL}/confirmEmail/${token.token}`
    sendEmail({
        from: "noreply@something.com",
        to: user.email,
        subject: "Verification Email",
        text: " Please click on the following link or copy paste it in your browser to verify your email." + url,
        html: `<a href='${url}'><button>Verify email.</button></a>`
    })

    res.status(200).json({ message: "Verication email has been sent to your email." })
}


// forget password
exports.forgetpassword = async (req, res) => {
    //check if email is registered or not
    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({ error: "User/Email does not exist. Please register" })
    }

    // generate token and send password reset link in email
    let token = new Token({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    })
    token = await token.save()
    if (!token) {
        return res.status(400).json({ error: "something went wrong" })
    }

    const url = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`
    sendEmail({
        from: "noreply@something.com",
        to: user.email,
        subject: "Password Reset Link",
        text: " Please click on the following link or copy paste it in your browser to reset your password." + url,
        html: `<a href='${url}'><button>RESET PASSWORD.</button></a>`
    })

    return res.status(200).json({message:"Password reset link has been sent to your email."})
}


//to reset password
exports.resetPassword = async(req, res) => {
    let token = await Token.findOne({token:req.params.token})
    if(!token){
        return res.status(400).json({error:"Token not found. or may have expired"})
    }
    let user = await User.findById(token.user)
    if(!user){
        return res.status(400).json({error:"User not found."})
    }
    user.password = req.body.password
    user = await user.save()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.status(200).json({message:"Password reset successfully."})
}


// signin process
exports.signIn = async(req, res) => {
    const {email, password} = req.body
    // check if email exists or not
    let user = await User.findOne({email: email})
    if(!user){
        return res.status(400).json({error: "Email/User does not exist. Please register first."})
    }
    // check if email and password match or not
    if(!user.authenticate(password)){
        return res.status(400).json({error: "Email and Password do not match."})
    }
    // check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error: "User not verified. Verify your account to contiue."})
    }
    // generate jwt 
    const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET)

    // send information to user, save in cookie 
    res.cookie('myCookie', token, { expire: Date.now()+86400})
    const { username, _id, role} = user

    res.status(200).json({token, user:{_id, username, email, role}})
}

// signout
exports.signOut = (req, res) => {
    res.clearCookie('myCookie')
    return res.status(200).json({message:"Signed out successfully."})
}

// authorization
exports.requireSignin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms:['HS256']
})

// update user
exports.updateUser = async (req, res) => {
    let user = await User.findByIdAndUpdate(
        req.params.id,
        {
            email: req.body.email, 
            username: req.body.username,
        },
        {
            new:true
        })
        if(!user){
            return res.status(400).json({error:"failed to update user."})
        }
        res.send(user)
}


// deleteUser
exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user=>{
        if(!user){
            return res.status(400).json({error:"User not found."})
        }
        else{
            return res.status(200).json({message:"User deleted successfully."})
        }
    })
    .catch(error=>res.status(400).json({error:error}))
}


// view user list
exports.userList = async(req, res) => {
    let users = await User.find()
    if(!users){
        return res.status(400).json({error:"Something went wrong."})
    }
    res.send(users)
}

// view user details
exports.userDetails = async(req,res) => {
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong."})
    }
    res.send(user)
}