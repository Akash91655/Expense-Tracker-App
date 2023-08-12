const express=require('express');
const router=express.Router();
const passwordController=require('../controllers/password');

router.post('/forgotpassword',passwordController.forgotPassword);
router.get('/resetpassword/:uuid',passwordController.resetPassword);
router.post('/updatepassword',passwordController.updatepassword);

module.exports=router;