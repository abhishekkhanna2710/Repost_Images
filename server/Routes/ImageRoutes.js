const express = require('express');
const router = express.Router();

const {getImages,postImages}  = require("../Controllers/Images.controllers.js")



router.route('/').get(getImages);
router.route('/').post(postImages);



module.exports = router;