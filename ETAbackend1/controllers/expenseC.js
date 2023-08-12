const expense=require('../model/expense');
const jwt=require('jsonwebtoken');
const userTabel=require('../model/user');
const sequelize=require('../util/database');

exports.addexpense= async (req,res,next)=> {
    const t= await sequelize.transaction(); 
    try{
        const token=req.header('Authorization');
    const amount=req.body.amount1;
    const des=req.body.dis;
    const category=req.body.category;
    const user=jwt.verify(token,'758478734eeh48734894ye784788232hwi88y42');
    const result=await expense.create(
        {amount:amount,
        description:des,
        category:category,
        userId:user.userId},
     {transaction:t});
    console.log(result);
        const amountUser=await userTabel.findByPk(user.userId,{attributes:['totalamount']})
            console.log("amount user----"+amountUser.dataValues.totalamount);
            console.log('type==='+typeof amount);
            const amountParse=parseInt(amount);
            amountUser.dataValues.totalamount+=amountParse;
            console.log("total amount="+amountUser.dataValues.totalamount);
            await userTabel.update({totalamount:amountUser.dataValues.totalamount},{where:{id:user.userId},transaction:t})
            await t.commit();
            const expenseData =await expense.findByPk(result.dataValues.id,{ attributes : ['id','amount','description','category']})
            console.log(expenseData);
            res.send(expenseData.dataValues);
            }
    catch(err){
        t.rollback()
        .then(()=>{console.log(err);
            res.status(500).send({ message: 'An error occurred while adding the expense.' })})
        .catch((err)=>console.log(err));
}
}
exports.removeexpense= async (req,res,next)=>{
    const t= await sequelize.transaction(); 
    try{
        const idTodelete=req.params.id;
        const amount=await expense.findOne({where :{id:idTodelete},attributes:['amount','userId']})
        await expense.destroy({where: {id:idTodelete },transaction:t})
        const totalamount=await userTabel.findByPk(amount.dataValues.userId,{attributes:['totalamount']})
        console.log('type==='+typeof amount);
        console.log(totalamount);
        const newamount=totalamount.dataValues.totalamount-amount.dataValues.amount;
        await userTabel.update({totalamount:newamount},{where:{id:amount.dataValues.userId},transaction:t})
        await t.commit();
        console.log('deleted');
        res.send('deleted sucessful')    
}
catch(err){
    await t.rollback();
    console.log(err);
    return res.status(500).json({success:'fail'});
}
}
exports.updateexpense=(req,res,next)=>{
    const IdToUpdate=req.params.id;
    console.log(IdToUpdate);
    const dataToUpdate=req.body;
    console.log(dataToUpdate);
    expense.update({
        amount:dataToUpdate.amount1,
        description:dataToUpdate.dis,
        category:dataToUpdate.category },
    {where:{id:IdToUpdate}}
    )
    .then(result=>{console.log('successfully updated'); res.send("updated")})
    .catch(err=>console.log(err));
}
exports.getexpense=(req,res,next)=>{
console.log("helllo i am in get===="+req.user.id);
   expense.findAll({where:{userId:req.user.id},attributes:['id','amount','description','category']})
    .then(userdata=>{
        console.log('users are====='+userdata)
        return res.json({user:userdata});
    })
    .catch(err=>console.log(err));
}
