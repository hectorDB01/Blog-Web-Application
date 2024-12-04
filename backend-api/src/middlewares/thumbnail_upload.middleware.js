const multer = require('multer')
const path = require('path')
const APIError = require('../utils/api-error')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/thumbnails')
    },
    filename: function(req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniquePrefix + path.extname(file.originalname))
    },
})

function thumbnailUpload(req, res, next) {
    const upload = multer({ storage: storage }).single('thumbnailFile')
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return next (
                new APIError(400, 'An error occurred while uploading the thumbnail')
            )
        } else if (err) {
            return next (new APIError(500, 'An unknown error occured while uploading the thumbnail'))
        }
        next()
    })
}

module.exports = thumbnailUpload;