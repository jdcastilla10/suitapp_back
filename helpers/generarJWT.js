const jwt=require('jsonwebtoken')
require('dotenv').config();

const generarJWT=(uid)=>{

    return new Promise((resolve,reject)=>{
        const payload={uid}
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'365d'
        },(error,token)=>{
            if(error){
                console.log(error)
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={
    generarJWT
} 