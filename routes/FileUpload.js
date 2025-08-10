const express = require("express");
const router=express.Router();

const {localfileUpload,imageUpload,videoUpload,imageSizeReducer} = require("../controller/fileUpload");

router.post("/localfileUpload",localfileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);

module.exports = router;