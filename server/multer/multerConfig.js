const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder where the uploaded images will be stored
    cb(null, '../Images');
  },
  filename: (req, file, cb) => {
    // Set the filename for each uploaded image
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the Multer instance with the storage configuration
const upload = multer({ storage })

module.exports = upload;