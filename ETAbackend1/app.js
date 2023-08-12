const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const app=express();


const expenseRoutes=require('./routes/expenseroute');
const userRoutes=require('./routes/user');
const purchaseRoutes=require('./routes/purchase');
const premiumRoutes=require('./routes/premium');
const passwordRoutes=require('./routes/password');

const expense=require('./model/expense');
const user=require('./model/user');
const forgot=require('./model/forgotpassword');
const fileDownloadTabel=require('./model/filedownloaded');
const helmet=require('helmet');
const path = require('path');


const morgan=require('morgan');
const fs=require('fs');


var cors=require('cors');
const order = require('./model/orders');
const accessLogsStream=fs.createWriteStream(path.join(__dirname,'acess.log'),{flags:'a'});

app.use(helmet());
app.use(morgan('combined',{ stream:accessLogsStream}));
app.use(cors());
app.use(bodyParser.json({extended:false}));
require('dotenv').config();
app.use('/password',passwordRoutes);
app.use('/user',userRoutes);
app.use('/premium',premiumRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);

user.hasMany(expense,{constraints: true,onDelete:'CASCADE'});
expense.belongsTo(user);

user.hasMany(order,{constraints:true,onDelete:'CASCADE'});
order.belongsTo(user);

user.hasMany(forgot,{constraints:true,OnDelete:'CASCADE'});
forgot.belongsTo(user);

user.hasMany(fileDownloadTabel,{constraints:true,OnDelete:'CASCADE'});
fileDownloadTabel.belongsTo(user);

sequelize
.sync()
.then(result=>{console.log(result); app.listen(3000);})
.catch(err=> console.log(err));