const { options } = require("..");
const File = require("../model/File");
const cloudinary = require('cloudinary').v2;

exports.localfileUpload = async(req,res)=>{
    try{
        const file=req.files.file;
        console.log("File ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH ->",path);
        file.mv(path , (err) =>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local File Uploaded Successfully"
        })

    }catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,options,quality) {
    //it is used to auto detect the file type 
    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        
        const file=req.files.imageFile;

        //validation
        const supportedType = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        const response = await uploadFileToCloudinary(file,{options:"Alok"});

        const fileData =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Uploaded Successfully',
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.videoUpload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
            success: false,
            message: "No video file uploaded"
        });
        }

        const file=req.files.videoFile;
        //validation
        const supportedType = ['mp4','mov'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,{folder:"Alok"});
        console.log(response);

        const fileData =await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
        })
        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:'Image Uploaded Successfully',
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


exports.imageSizeReducer = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        
        const file=req.files.imageFile;

        //validation
        const supportedType = ['jpg','jpeg','png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        const response = await uploadFileToCloudinary(file,{folder:"Alok"},40);

        const fileData =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Uploaded Successfully',
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}