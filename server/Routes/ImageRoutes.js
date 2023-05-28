const express = require('express');
const router = express.Router();

const { getImages, postImages, updateImage,deleteImage } = require("../Controllers/Images.controllers.js")



router.route('/').get(getImages);
router.route('/').post(postImages);
router.route('/:id').put(updateImage);
router.delete('/:id', deleteImage);



module.exports = router;