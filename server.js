const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const { urlencoded } = require('body-parser')
const hbs = require('hbs')
const homeRoute = require('./routers/home')
const catRoute = require('./routers/category')
const proRoute = require('./routers/product')
//process.stdin.emit('data', "module.exports.repl.ignoreUndefined = true;\n"); //for remove {}undefined 



//middlewares
app.use(urlencoded({ extended : false }))
app.use(express.json())

//view engine
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views/partials'))

//db connection
const db = 'mongodb+srv://admin:lumia540@nodejs.tdcn0.mongodb.net/Task1?retryWrites=true&w=majority'
mongoose.connect(db, { useCreateIndex : true, useNewUrlParser : true, useUnifiedTopology : true })
.then((connect)=>{
    console.log('Connected to db successfully')
})
.catch(err=>{
    console.log(err)
})


//routes
app.use('/', homeRoute)
app.use('/cat', catRoute)
app.use('/pro', proRoute)

//listening port
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})





// const express = require('express')
// const app = express()
// const PORT = 8000

// const posts = [
//     {
//         id: '1',
//         title: 'mypost1',
//     },
//     {
//         id: '2',
//         title: 'mypost1',
//     },
//     {
//         id: '3',
//         title: 'mypost1',
//     },
//     {
//         id: '4',
//         title: 'mypost1',
//     },
//     {
//         id: '5',
//         title: 'mypost1',
//     },{
//         id: '6',
//         title: 'mypost1',
//     },
//     {
//         id: '7',
//         title: 'mypost1',
//     },
//     {
//         id: '8',
//         title: 'mypost1',
//     },

// ]




// app.get('/api', (req, res)=>{
//     console.log(req.query)
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)

//     //page=1 then 1-1*5=0 ==>arr[0]
//     //page=2 then 2-1*5=5 ==>arr[5]
//     const startIndex = (page - 1) * limit
//     //1*5 ==> arr[5]
//     //2*5 ==> arr[10]
//     const endIndex = page * limit
//     //slice==>arr[0][5]
//     //slice==>arr[5][10]
//     const result = {}

//     if(endIndex < posts.length){
//         result.next = {
//             page : page + 1,
//             limit : limit
//         }
    
//     }
    
//     if(startIndex > 0){
//         result.previous = {
//             page : page - 1,
//             limit : limit
//         }
//     }
    

//     result.resultPosts = posts.slice(startIndex, endIndex)
//     res.json(result)
// })


// //go to page by no
// app.get('/api/:pageno', (req, res)=>{
//     console.log(req.params.pageno)
//     const { pageno } = req.params
//     const limit = 5

//     const startIndex = (pageno - 1) * limit 
//     const endIndex = pageno * limit
    
//     const resPosts = posts.slice(startIndex, endIndex)
//     console.log(resPosts)

//     res.send(resPosts)
// })




// app.listen(PORT, ()=>{
//    console.log(`Listenning on post ${PORT}...`)

// })

