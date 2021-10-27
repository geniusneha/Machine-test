const express = require('express')
const Category = require('../models/categoryModel')
const { adminrequired } = require('../config/JWT')


const getCat = async(req, res)=>{
    try{
        const category = await Category.findAll()
        res.json(category)
    }
    catch{
        console.log(err)
    }
}


const addCat = async(req, res)=>{
        try{
            const { title } = req.body
            const category = new Category({
                title
            })
            const saveCat = await category.save()
            res.json(saveCat)
        }
        catch(error){
            console.log(error)
        }
    }


const editCat =  async(req, res)=>{
    try{
        const{id} = req.params
        const { title } = req.body
        const updateCat = await Category.update({ title },{ where:{ id : id }})
        res.status(205).json(updateCat)
    }
    catch(error){
        console.log(error)
    }
}


const delCat =  async(req, res)=>{
    try{
        const{id} = req.params
        const updateCat = await Category.destroy({ where:{ id : id }})
        res.status(205).json(updateCat)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = { getCat, addCat, editCat, delCat }