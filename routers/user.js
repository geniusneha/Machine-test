const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt') // library to help you hash passwords.
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { client, GET_ASYNC, SET_ASYNC } = require('../config/redisclient')
const { loginrequired, adminrequired, supervisorrequired } = require('../config/JWT')


// *************  REGISTER  *************
router.get('/register', async(req, res)=>{
    try{
        const user = await User.findAll()
        res.json(user)
    }
    catch(error){
        console.log(error)
    }
})


router.post('/register', async(req, res)=>{
    try{
        const { name, email, password, role } = req.body
        const user= new User({
            name,
            email,
            password,
            role
        })
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
        user.password = hashPassword
        const saveUser = await user.save()
        res.json(saveUser)
    }
    catch(error){
        console.log(error)
    }
})


// *************  LOGIN  *************

createToken = (user)=>{
    return jwt.sign({user}, "secretkey")
}


router.get('/login', async(req, res)=>{
    try{
        res.json('LOGINPAGE')
    }
    catch(error){
        console.log(error)
    }
})


router.post('/login', async(req, res)=>{
    try{
        const { email, password } = req.body
        const user = await User.findOne({ where : { email : email } })

        if(user){
            const matchPass = await bcrypt.compare(password, user.password)
            if(matchPass){
                

                //redis setup
                const get_counter = await GET_ASYNC("counter")
                // console.log(get_counter)
                const set_counter = await SET_ASYNC("counter", parseInt(get_counter) + 1)
                const token = createToken(user)
                const addToken = await SET_ASYNC(parseInt(get_counter) + 1, token)
                // const realToken = await GET_ASYNC
                res.cookie('access-token', (parseInt(get_counter) + 1), { httpOnly : true })
                // console.log(set_counter)
                // console.log(token)
                res.status(200).json(`LoggedIn ${token}`)


            }
            else{
                res.status(400).json('InvaaddTokenlid Password')
            }
        }
        else{
            res.status(400).json('Invalid Details')
        }
    }
    catch(error){
        console.log(error)
    }
})


router.get('/private', loginrequired, (req, res)=>{
    res.json('SUCCESS')
})


router.get('/admin-private', adminrequired, (req, res)=>{
    res.json('ADMIN IS HERE BOIS')
})


router.get('/supervisor-private', supervisorrequired,(req, res)=>{
    res.json('SUPERVISOR IS HERE BOIS')
})

module.exports = router