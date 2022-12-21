const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileDestination = 'public/uploads/'
        if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination, { recursive: true })
            cb(null, fileDestination)
        }
        else{
            cb(null, fileDestination)
        }
    },

    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname) 
        let filename = path.basename(file.originalname, ext)

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, filename + uniqueSuffix + ext)
    }
})

const filefilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|svg|JPG|PNG|JPEG|jpeg|jfif|JFIF|gif|GIF)/)) {
        return cb(new Error('You can upload image files only'), false)
    }
    return cb(null, true)
}

exports.upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: {
        fileSize: 2048000
    }
})