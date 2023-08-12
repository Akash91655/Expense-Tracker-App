const purchaseController=require('../controllers/purchase');
const express=require('express');
const router=express.Router();
const authMiddleware=require('../middleware/auth');

router.get('/membership',authMiddleware.authentication,purchaseController.purchasePremium);
router.post('/updatetransactionstatus',authMiddleware.authentication,purchaseController.updateTransaction);

module.exports=router;