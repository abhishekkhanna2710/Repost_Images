const ItemImage = require("../models/imageSchema.js");


const getImages = async(req,res)=>{
    res.send("I am Image 2");
}


const postImages = async (req, res) =>{
    try {
        const {
            serialNumber,
            title,
            image_url
        } = req.body;
    
        const newItem = await ItemImage.create({
            serialNumber,
            title,
            image_url
          });
    
          res.status(201).json(newItem);
    } catch (error) {
         console.error('Error in postImages:', error);
         res.status(500).json({ message: 'Internal Server Error' });
    }
   

}













module.exports = {
    getImages,postImages
  };