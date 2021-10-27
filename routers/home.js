const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

// const limit = 5


router.get('/', async(req, res)=>{
    try{
        console.log(req.query)
        const page =+ req.query.page || 1
        const limit =+ req.body.limit || 5
        console.log(req.query.limit)
        // const category = await Category.find({})
        //count products
        const productNo = await Product.find().countDocuments()
        const totalItems = productNo
        const product = await Product.find({}).populate('category').skip((page-1)*limit).limit(limit).sort('-_id')
        // console.log(product)

        // console.log(productNo)
        res.render('index', 
            {
                product : product,
                currentPage: page,
                hasNextPage: (limit * page) < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / limit)
            } )
    }
    catch(err){
        console.log(err)
    }
    
})

router.post('/', async(req, res)=>{
    try{
        console.log(req.query)
        const page =+ req.query.page || 1
        const limit =+ req.body.limit 
        // console.log(req.query.limit)
        // const category = await Category.find({})
        //count products
        const productNo = await Product.find().countDocuments()
        const totalItems = productNo
        const product = await Product.find({}).populate('category').skip((page-1)*limit).limit(limit).sort('-_id')
        // console.log(product)

        // console.log(productNo)
        res.render('index', 
            {
                limit: limit,
                product : product,
                currentPage: page,
                hasNextPage: (limit * page) < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / limit)
            } )
    }
    catch(err){
        console.log(err)
    }
    
})



// router.get('/page', async(req, res)=>{
//     try{
//         console.log(req.query)
//         const page =+ req.query.page || 1
//         const limit =+ req.query.limit
//         // const category = await Category.find({})
//         //count products
//         const productNo = await Product.find().countDocuments()
//         const totalItems = productNo
//         const product = await Product.find({}).populate('category').skip((page-1)*limit).limit(limit).sort('-_id')
//         console.log(product)

//         console.log(productNo)
//         res.render('index', 
//             {
//                 product : product,
//                 currentPage: page,
//                 hasNextPage: (limit * page) < totalItems,
//                 hasPreviousPage: page > 1,
//                 nextPage: page + 1,
//                 previousPage: page - 1,
//                 lastPage: Math.ceil(totalItems / limit)
//             } )
//     }
//     catch(err){
//         console.log(err)
//     }
    
// })




module.exports = router