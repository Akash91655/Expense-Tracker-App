const express=require('express');
const router=express.Router();
const expenseController=require('../controllers/expenseC');
const authRoutes=require('../middleware/auth');

router.post('/postexpense',expenseController.addexpense);
router.delete('/deleteexpense/:id',expenseController.removeexpense);
router.put('/updateexpense/:id',expenseController.updateexpense);
router.get('/getexpense',authRoutes.authentication,expenseController.getexpense);

module.exports=router;