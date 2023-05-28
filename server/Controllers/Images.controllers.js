const ItemImage = require("../models/imageSchema.js");
const upload = require("../multer/multerConfig.js");
const multer = require('multer');
const path = require('path');


const getImages = async (req, res) => {
    try {
        const images = await ItemImage.find();
        res.status(200).json(images);
    } catch (error) {
        console.log(error, 'Error in get Images')
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const postImages = async (req, res) => {
    try {

        upload.single('imageUrl', 12)(req, res, async (err) => {
            console.log(req.body)
            console.log(req.file)

            if (err instanceof multer.MulterError) {
                console.error('Multer Error:', err);
                return res.status(400).json({ message: 'Error uploading images' });
            } else if (err) {
                console.error('Error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            // Extract the uploaded file details from req.file
            const { serialNumber, title } = req.body;
            const image_url = req.file;


            // Handle the uploaded image here
            // For example, you can save the image URL to the database
            const newItem = await ItemImage.create({
                serialNumber,
                title,
                image_url
            });

            // Return the created item as the response
            res.status(201).json(newItem);
            console.log(image_url);
        });
    } catch (error) {
        console.error('Error in postImages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};













module.exports = {
    getImages, postImages
};