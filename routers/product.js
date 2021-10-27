const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')


router.get('/', async(req, res)=>{
    try{
        const category = await Category.find({})
        const product = await Product.find({})
        res.render('product', { product : product, category : category } )
    }
    catch(err){
        console.log(err)
    }
    
})

//CURD
router.post('/', async(req, res)=>{
    try{
        const{ name, category } = req.body
        const product = new Product({
            name,
            category
        })
        const newPro = await product.save()
        const cat = await Category.findById({ _id : category})
        const saveProInCat = await cat.products.push(newPro)
        const saveCat = await cat.save()
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
})


//delete
router.get('/del/:id', async(req, res)=>{
    try{
        const{ id } = req.params
        const product = await Product.findByIdAndDelete({ _id : id })
        console.log('deleted')
        res.redirect('/')
    }   
    catch(err){
        console.log(err)
    }
})


//update
router.get('/edit/:id', async(req,res)=>{
    try{
        const{id} = req.params
        const category = await Category.find({})
        const product = await Product.findOne({ _id : id }).populate('category')
       
        res.render('edit-pro', { product : product, category : category})
        
    }
    catch(err){
        console.log(err)
    }
})




router.post('/edit/:id', async(req, res)=>{
    try{
        const{id} = req.params
        console.log('i have run')
        const{ category, name } = req.body
        console.log(category)
        console.log(name)

        // const category = await Category.find({})
        // const pro = await Product.findOne({ _id : id })
        const updatePro = await Product.findOneAndUpdate({ _id : id }, {name : name, category :category}, { new : true })
        // const updateCat = await Category.findOneAndUpdate({ _id : id }, {name : name}, { new : true })

        console.log('heyyy')
        console.log(req.body)
        console.log('heyyy')
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router