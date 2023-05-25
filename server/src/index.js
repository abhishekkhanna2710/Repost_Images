const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello World");
})


const port =  process.env.PORT || 5050;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})