const express = require('express')
const router = express.Router()
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const { getPro, addPro, editPro, delPro, filterPro } = require('../controllers/productControl')
const { supervisorrequired } = require('../config/JWT')

// router.get('/', async(req, res)=>{
//     try{
//         const product = await Product.findAll()
//         res.json(product)
//     }
//     catch{
//         console.log(err)
//     }
// })

router.get('/', getPro)
router.get('/getpro/:id', filterPro)
router.post('/:id', supervisorrequired, addPro)
router.put('/edit/:id', supervisorrequired, editPro)
router.delete('/del/:id', supervisorrequired, delPro)





module.exports = router