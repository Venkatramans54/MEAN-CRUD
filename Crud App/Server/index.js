const express = require('express');
const connectDB = require('./config/db');

const cors=require('cors');

const app = express();
app.use(cors());
connectDB();
app.use(express.json({extended:false}));
app.use("/",require("./controller/userController"));
const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log("Server Started...");
});