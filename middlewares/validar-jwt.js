
const { response, request } = require('express')
const jwt=require('jsonwebtoken')
const { getUser, validarSesionJWT } = require('../models/Usuarios')
require('dotenv').config();

const validarJWT=async(req=request,res=response,next)=>{
    const headerAuthorization =req.header('Authorization')

    let token
    

    if (typeof headerAuthorization !== 'undefined') {
        const split=headerAuthorization.split(' ')
        token = split[split.length-1];
 
    }


    if(!token){
        return res.status(400).json({
            success:false,
            errors:'Token inválido'
        })
    }

    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //console.log({decoded});
    if(!decoded.uid){
        return res.status(400).json({
            success:false,
            errors:'Este usuario inició sesión en otro dispositivo'
        })
    }

    const validar=await validarSesionJWT(token,decoded.uid)

    if(!validar){
        return res.status(400).json({
            success:false,
            errors:'Token inválido',
            message:'Este usuario inició sesión en otro dispositivo',
            
        })
    }

    next()
    
}

module.exports={
    validarJWT
}