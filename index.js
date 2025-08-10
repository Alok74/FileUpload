const express = require("express");
const db = require("./config/database")
const fileupload = require("express-fileupload");
require("dotenv").config();

const app=express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// connect with database
db.connect();

//connect with cloudinay 
const cloudinary =  require("./config/cloudinary")
cloudinary.cloudinaryConnect();

//mount the api
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload", Upload)

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})

module.exports = app;

