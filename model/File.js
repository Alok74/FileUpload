const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }
})

//post
fileSchema.post("save" , async function(doc) {
    try{
        console.log("DOC ->",doc);

        let transporter = nodemailer.createTransport({
            host:process.env.HOST_NAME,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        //send mail
        let info= await transporter.sendMail({
            from:"Alok",
            to:doc.email,
            subject:"File uploaded successfully",
            html:`<h2>Hello Jee</h2> <p>File Uploaded View here: < href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("INFO-> ",info)

    }catch(error){
        console.error(error);
        throw error;
    }
    
    
})



const File = mongoose.model("file",fileSchema);
module.exports = File;