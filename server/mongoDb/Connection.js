const mongoose = require('mongoose');

module.exports=()=>{
    const connectionParams = {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    }

    try{
        mongoose.connect("mongodb+srv://abhikhanna2710:learnNew10@cluster0.aqxyspl.mongodb.net/", connectionParams)
        console.log("Database Connected")
    }catch(err){
        console.log(err.message);
        console.log("Failed Connection")
    }
}