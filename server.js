const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const dotenv = require('dotenv').config() //enviro varible
const { urlencoded } = require('body-parser')
const ejs = require('ejs') // embedded javascript templating
const sequelize = require('./config/dbconnect')
const cookie = require('cookie-parser')
//routers
const categoryRoute = require('./routers/category')
const productRoute = require('./routers/product')
const userRoute = require('./routers/user')
const homeRoute = require('./routers/home')


//middlewares
app.use(express.json())
app.use(urlencoded({ extended : false }))
app.use(cookie())


//view engine
app.set('view engine', 'ejs')


//staticfiles
app.use(express.static('./static'))
app.set('/img', express.static(__dirname + './static/img'))
app.set('/upload', express.static(__dirname + './static/upload'))



//db connection
sequelize.sync({ force : true })
.then((connect)=>{
    console.log(`Database Connected`)
})
.catch(err=>{
    console.log(err)
})




//routes
app.use('/', homeRoute)
app.use('/user', userRoute)
app.use('/pro', productRoute)
app.use('/cat', categoryRoute)



//port
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})