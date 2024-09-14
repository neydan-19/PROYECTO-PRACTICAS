const{DataTypes}=require('sequelize')
const sequelize = require('../db')
const User=require('./Users')
const Category = require('./Category')

const Task = sequelize.define('Task',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

//DEFINIR RELACIONES
Task.belongsTo(User)
User.hasMany(Task)

Task.belongsTo(Category)
Category.hasMany(Task)

module.exports=Task