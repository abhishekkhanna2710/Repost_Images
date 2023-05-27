const express = require('express');
const router = express.Router();

const {getImages}  = require("../Controllers/Images.controllers.js")



router.route('/').get(getImages);



module.exports = router;