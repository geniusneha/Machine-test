const jwt = require('jsonwebtoken')
const { client, GET_ASYNC, SET_ASYNC } = require('./redisclient')


//************ LOGIN REQUIRED   ************ 
const loginrequired = async(req, res, next)=>{
    try{
        //grab the token
        const grabCookie = req.cookies['access-token']

        //grabtoken
        if(grabCookie){
            const token = await GET_ASYNC(grabCookie)
            console.log(token)
            if(token){
                const validateToken = await jwt.verify(token, 'secretkey')
                if(validateToken){
                    req.user = validateToken.user
                    next()
                }
                else{
                    res.status(400).json('Invalid Token')
                }
            }
            else{
                res.status(400).json('Token not found')
            }
        }
        else{
            res.status(402).json('GO AWAY')
        }

        
    }
    catch(error){
        console.log(error)
    }
    
}




//************ ADMIN REQUIRED   ************ 
const adminrequired = async(req, res, next)=>{
    try{
        //grab the cookie
        const grabCookie = req.cookies['access-token']
        if(grabCookie){
            const token = await GET_ASYNC(grabCookie)
            if(token){
                const validateToken = await jwt.verify(token, 'secretkey')
                if(validateToken){
                    req.user = validateToken.user
                    // console.log(req.user.role)
                    if(req.user.role == 'admin'){
                        next()
                    }
                    else{
                        res.status(403).json('NOT A ADMIN')
                    }
                    
                }
                else{

                }
                
            }
            else{
                console.log('Token not found')
            }

        }
        else{
            console.log(`Token not found`)
        }
    }
    catch(error){
        console.log(error)
    }
}



//************ SUPERVISOR REQUIRED   ************ 
const supervisorrequired = async(req, res, next)=>{
    try{
        //grab the cookie
        const grabCookie = req.cookies['access-token']
        if(grabCookie){
            const token = await GET_ASYNC(grabCookie)
            if(token){
                const validateToken = await jwt.verify(token, 'secretkey')
                if(validateToken){
                    req.user = validateToken.user
                    // console.log(req.user.role)
                    if(req.user.role == 'supervisor' || req.user.role == 'admin'){
                        next()
                    }
                    else{
                        res.status(403).json('NOT A SUPERVISOR')
                    }
                    
                }
                else{

                }
            }
            else{
                console.log('Token not found')
            }

        }
        else{
            console.log(`Token not found`)
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports = { loginrequired, adminrequired, supervisorrequired }