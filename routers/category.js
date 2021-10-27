const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Category = require('../models/categoryModel')


router.get('/', async(req, res)=>{
    try{
        const category = await Category.find({})
        res.render('category', { category : category} )
    }
    catch(err){
        console.log(err)
    }
    
})

//CURD
router.post('/', async(req, res)=>{
    try{
        const{ name } = req.body
        const category = new Category({
            name
        })
        const newCat = await category.save()
        res.redirect('/cat')
    }
    catch(err){
        console.log(err)
    }
})


//update
// router.delete('/del/:id', async(req, res)=>{
//     try{
//         const{ id } = req.params
//         const category = await Category.findByIdAndDelete({ _id : id })
//         console.log('deleted')
//         res.redirect('/cat')
//     }
//     catch(err){
//         console.log(err)
//     }
// })


//delete
// router.get('/del/:id', async(req, res)=>{
//     res.redirect('/cat')
// })







router.get('/del/:id', async(req, res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const category = await Category.findOneAndDelete({ _id : id })
        console.log('deleted')
        res.redirect('/cat')
    }
    catch(err){
        console.log(err)
    }
})


// router.get('/update/:id', async(req, res)=>{
//     try{
//         const{id} = req.params
//         const category = await Category.findOne({ _id : id })
//         const updatecat = await Category.updateOne({ _id : id }, req.body, { new :true })
//         // const saveUser = await user.save()
       
//         console.log(category.name)
//         res.render('category', { category : category })
//     }
//     catch(err){
//         console.log(err)
//     }
// })

router.get('/update/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const category = await Category.findById({ _id : id })
        console.log('i am here')
        res.render('edit-cat', { category : category })
    }
    catch(err){
        console.log(err)
    }
})



router.post('/update/:id', async(req, res)=>{
    try{
        const{id} = req.params
        const category = await Category.findOne({ _id : id })
        const updatecat = await Category.updateOne({ _id : id }, req.body, { new :true })        // const saveUser = await user.save()
       
        console.log(category.name)
        res.redirect('/cat')
    }
    catch(err){
        console.log(err)
    }
})




module.exports = router