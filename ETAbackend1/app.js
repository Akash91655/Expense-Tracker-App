const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const app=express();

const expenseRoutes=require('./routes/expenseroute');
const userRoutes=require('./routes/user');
const purchaseRoutes=require('./routes/purchase');
const premiumRoutes=require('./routes/premium');

const expense=require('./model/expense');
const user=require('./model/user');
var cors=require('cors');
const order = require('./model/orders');

app.use(cors());
app.use(bodyParser.json({extended:false}));
require('dotenv').config();
app.use('/user',userRoutes);
app.use('/premium',premiumRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);

user.hasMany(expense,{constraints: true,onDelete:'CASCADE'});
expense.belongsTo(user);
user.hasMany(order,{constraints:true,onDelete:'CASCADE'});
order.belongsTo(user);

sequelize
.sync()
.then(result=>{console.log(result); app.listen(3000);})
.catch(err=> console.log(err));
