const { response,request} = require('express')
const { login, registerUser,logout } = require('../models/Auth')




const authLogin=async(req=request, res=response)=>{
    const {usuario,contrasena,idCandidato}=req.body

    console.log({usuario,contrasena,idCandidato})
   /*  return res.json({
        success:true,
        usuario:usuario,
        password:password
    }) */

    try {
        const user= await login(usuario,contrasena,idCandidato)
        if(user){
            return res.json({
                success:true,
                token:user.token,
                user:user.usuario,
            })
        }else{
            return res.status(401).json({
                success:false,
                errors:'Usuario o contraseña incorrecta'
            })
        } 
        
    } catch (error) {
        console.log({error})
        return res.status(422).json({
            success:false,
            errors:'Hable con el administrador'
        })
    }

}

const authLogout=async(req=request, res=response)=>{
    const {usuario}=req.body

    try {
        const resp= await logout(usuario)
        if(resp==='cerrada la sesion'){
            return res.json({
                success:true
            })
        }else{
            return res.status(401).json({
                success:false,
                errors:'No fue posible cerrar sesion'
            })
        } 
        
    } catch (error) {
        console.log({error})
        return res.status(422).json({
            success:false,
            errors:'Hable con el administrador'
        })
    }

}

const authRegistro=async(req=request, res=response)=> {

    const body=req.body

    const resp = await registerUser(body)

    res.json({
        success:true,
        data:resp
    })
}




module.exports={
    authLogin,
    authRegistro,
    authLogout
}