const Sequelize=require('sequelize');
const sequelize=new Sequelize('expense','root','@Katty2714',{dialect: 'mysql',host:'localhost'});
module.exports=sequelize;