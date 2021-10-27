const express = require('express')
const router = express.Router()
// const Category = require('../models/categoryModel')


router.get('/', async(req, res)=>{
    try{
        // const category = await Category.findAll()
        // res.json(category)
        res.render('index')
    }
    catch{
        console.log(err)
    }
})


module.exports = router