const { Sequelize }=require('sequelize')
require('dotenv').config()

const sequelize=new Sequelize(process.env.DATABASE_URL,{
    dialect:process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

//PROBAR CONEXION
sequelize.authenticate()
    .then(()=>console.log('Conexion exitosa'))
    .catch(err=>console.log('No se conecto'))
    

module.exports=sequelize