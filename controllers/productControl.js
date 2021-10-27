const express = require('express')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')


const getPro = async(req, res)=>{
    try{
        const product = await Product.findAll({ include: [Category] })
        res.json(product)
    }
    catch{
        console.log(err)
    }
} 


const addPro = async(req, res)=>{
    try{
        const categoryId  = req.params.id
        console.log(categoryId)
        const { name, image, price, description } = req.body
        console.log(req.body)
        const product = new Product({
            categoryId,
            name,
            image,
            price,
            description
        })
        const savePro = await product.save()
        res.json(savePro)
    }
    catch{
        console.log(err)
    }
}


const editPro = async(req, res)=>{
    try{
        const{ id } = req.params
        const{ name, image, price, description } = req.body
        const updatePro = await Product.update({ name, image, price, description }, { where : { id:id }})
        res.status(203).json(updatePro)
    }
    catch(error){
        console.log(error)
    }
    
} 


const delPro = async(req, res)=>{
    try{
        const{ id } = req.params
        const delPro = await Product.destroy({ where : { id:id }})
        res.status(203).json(delPro)
    }
    catch(error){
        console.log(error)
    }
    
}  

const filterPro = async(req, res)=>{
    try{
        const categoryId = req.params.id
        const product = await Product.findAll({ where : { categoryId : categoryId }, include: [Category] })
        res.json(product)
    }
    catch{
        console.log(err)
    }
}


module.exports = { getPro, addPro, filterPro, editPro, delPro }