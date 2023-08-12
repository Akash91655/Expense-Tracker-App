const Paypal=require('paypal');
const order=require('../model/orders');

exports.purchasePremium= async (req,res,next)=>{
    try {
        var ppl=new Paypal({
            key_id:process.env.PAYPAL_KEY_ID,
            key_secret:process.env.PAYPAL_KEY_SECRET
        })
        const amount=2500;
        ppl.orders.create({amount,currency:"INR"},(err,order)=> {
                if(err) {
                    console.log('in ppl.orders.create');
                    throw new Error(JSON.stringify(err));
                }
                req.user.createOrder({orderid:order.id,status:'PENDING'})
                .then(()=>{return res.status(201).json({order,key_id:ppl.key_id})})
                .catch(err=>{throw new Error(err)});
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:'something went wrong',error:err})
    }
}
exports.updateTransaction= async (req,res)=>{
    try{
        console.log('payment id=================='+req.body.payment_id);
        const updatedTransaction=await order.update({paymentid:req.body.payment_id,status:'SUCCESS'},{where:{userId:req.user.id}})
        console.log(updatedTransaction);
        req.user.update({ispremiumuser:true})
        .then(()=>{return res.status(202).json({sucess:true,message:"Transaction Successful",user:req.user.ispremiumuser})})
        .catch(err=>console.log(err));
    }
    catch(err){
        console.log(err);
    }
}