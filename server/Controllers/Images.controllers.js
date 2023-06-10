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
        upload.single('imageUrl')(req, res, async (err) => {
            console.log(req.body);
            console.log(req.file);

            if (err instanceof multer.MulterError) {
                console.error('Multer Error:', err);
                return res.status(400).json({ message: 'Error uploading images' });
            } else if (err) {
                console.error('Error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const { serialNumber, title } = req.body;
            const image_url = `${req.protocol}://${req.get('host')}/${req.file.filename}`;

            console.log(
                image_url,
                'dsrjfvnrsfgvrfngvkngfvrbndsfnrkbfrkfndsrkbfrsdkdnfkdrsnfkdr'
            );
            const newItem = await ItemImage.create({
                serialNumber,
                title,
                image_url: image_url
            });

            res.status(201).json(newItem);
        });
    } catch (error) {
        console.error('Error in postImages:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateImage = async (req, res) => {
    try {
        const id = req.params.id;
        const { serialNumber, title } = req.body;

        let image = await ItemImage.findById(id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        // Handle the uploaded file if it exists
        if (req.file) {
            image.image_url = req.file.path; // Assuming you are storing the file path in the image_url field
        }

        // Update the other fields
        image.serialNumber = serialNumber;
        image.title = title;

        image = await image.save();

        return res.status(200).json({ message: 'Image updated successfully.', image });
    } catch (error) {
        console.error('Error updating image:', error);
        return res.status(500).json({ error: 'An error occurred while updating the image.' });
    }
};



const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await ItemImage.findById(id);

        if (!image) {
            return res.status(404).json({ error: 'Image not found.' });
        }

        await image.deleteOne();
        return res.status(200).json({ message: 'Image deleted successfully.' });

    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the image.' });
    }
};



module.exports = {
    getImages, postImages, updateImage, deleteImage
};