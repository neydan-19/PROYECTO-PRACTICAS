const {DataTypes}=require('sequelize')
const sequelize=require('../db')

const User = sequelize.define('User',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
})
module.exports=User