const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");

const Connection = require("../mongoDb/Connection.js");
const ImageRouter = require("../Routes/ImageRoutes.js");

const app = express();


// Mongo Db Connection
Connection();

// Middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

// using routes by middle wares

app.use('/api/vi/images', ImageRouter)


app.get('/',(req,res)=>{
    res.send("Hello World");
})


const port =  process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})