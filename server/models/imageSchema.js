const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    serialNumber:{
        type:String,
        // required :true,
    },
    title:{
        type:String,
        // requuired:true,
    },
    image_url:{
        type:[String],
        // required:true,
    }
})


const ItemImage = mongoose.model('imagesList', itemsSchema);

module.exports = ItemImage;