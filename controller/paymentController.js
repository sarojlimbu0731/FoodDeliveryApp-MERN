const axios = require('axios');
require('dotenv').config()

//send public key
exports.sendKey = async (req, res) => {
    res.status(200).json({ publicKey: process.env.PUBLIC_KEY })
}


//verify client Payment
exports.verifyPayment = async (req, res) => {
    let data = {
        "token": req.body.token,
        "amount": req.body.amount
    };

    let config = {
        headers: { 'Authorization':'Key'+ process.env.SECRET_KEY }
    };
    console.log("hello this is checkpoint")
    console.log(req.body.token, req.body.amount)
    console.log(process.env.SECRET_KEY)

    await axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

}
