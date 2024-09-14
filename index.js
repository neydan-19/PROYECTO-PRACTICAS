const express= require('express')
const bodyparser=require('body-parser')
const morgan=require('morgan')
const sequelize = require('./db')
const userRoutes=require('./routes/userRoutes')
const taskRoutes=require('./routes/taskRoutes')
const categoryRoutes=require('./routes/categoryRoutes')

const app = express()

app.use(bodyparser.json())
app.use(morgan('dev'))

app.use('/users', userRoutes)
app.use('/task', taskRoutes)
app.use('/categories',categoryRoutes)

sequelize.sync({force:false})
    .then(()=>console.log('BD sincronizaada'))
    .catch(()=>console.log('No se pudo sincronizar'))


    const PORT = process.env.PORT || 3000
    app.listen(PORT, ()=>{
        console.log(`Servidor levantado en el puerto ${PORT} `);
        
    })