const express=require('express');
const router=express.Router();

const premiumController=require('../controllers/premium');
const authRoutes=require('../middleware/auth');
const expenseController=require('../controllers/expenseC');

router.get('/showleaderboard',premiumController.showleader);
router.get('/showfiledownloaded',authRoutes.authentication,expenseController.showfiledownloaded);

module.exports=router;
