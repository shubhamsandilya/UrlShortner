const express=require('express')
const router=express.Router();
const {handleGenerateShortUrl}=require('../controllers/url')
router.post('/',handleGenerateShortUrl);

module.exports=router