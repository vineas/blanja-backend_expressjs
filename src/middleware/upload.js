const multer = require("multer");
const createError = require('http-errors')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ 
  storage: storage, 
  limits: {fileSize: 1024 * 1024 * 2}, 
  fileFilter: function (req, file, cb) {
    const formatImage = ['jpg', 'jpeg', 'png']
    const Extension = file.mimetype.split('/')[1]
    console.log(Extension)

    if (formatImage.includes(Extension)) {
      return cb(null, true)
    } else {
      return cb(new createError(400, 'Only for jpg, jpeg or png file!'), false)
    }
  }
});

module.exports = upload;
