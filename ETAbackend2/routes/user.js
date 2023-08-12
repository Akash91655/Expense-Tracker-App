const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
const authMiddleware=require('../middleware/auth');
const expenseController=require('../controllers/expenseC');

router.post('/signup',userController.addUser);
router.post('/login',userController.checkUser);
router.get('/download',authMiddleware.authentication,expenseController.download);

module.exports=router;