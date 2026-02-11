const query = require('../db/query');const { generarJWT } = require('../helpers/generarJWT');
;
require('dotenv').config();
const crypto = require('crypto');

const login = async(user,password,idCandidato)=>{

    sql =`SELECT * from usuarios WHERE usuario='${user}'`
    
    const consulta =await query(sql) 
    console.log({consulta})
    console.log('leng',consulta.length)
   
    if(consulta.length>0){
        const {id,contrasena,estado,...usuario}=consulta[0]

        if(estado !== '1'){
            return 
        }

        const hashCalculado = crypto.createHash('sha1').update(password).digest('hex');
        console.log({hashCalculado})
        console.log({contrasena})
        if(hashCalculado !==contrasena){
            return 
        }

        const token = await generarJWT(user)
        
        const resp =await saveToken(token,id)
        const saveIdCand =await saveIdCandidato(idCandidato,id)
        console.log({resp})
        console.log({saveIdCand})
        return {usuario,token} 

    }else{
        return
    }       


    
}
const logout = async(user)=>{

    sql =`SELECT * from usuarios WHERE usuario='${user}'`
    
    const consulta =await query(sql)
    console.log({consulta})
    console.log('leng',consulta.length)
   
    if(consulta.length>0){
        const {id,...usuario}=consulta[0]
        const resp =await saveToken('',id)
        const resp2 =await updateCandidato('',id)
        if(resp.affectedRows===1){
console.log({resp})
        return 'cerrada la sesion'
        } 
        

    }else{
        return
    }       


    
}

const saveIdCandidato=async(idCandidato,id_usuario)=>{

    let sql=`UPDATE usuarios SET candidato = ? WHERE id = ?`
    const params=[
        idCandidato,
        id_usuario
    ]
    const resp=await query(sql,params)
    return resp
}

const updateCandidato=async(candidato,id_usuario)=>{

    let sql=`UPDATE usuarios SET candidato = ? WHERE id = ?`
    const params=[
        candidato,
        id_usuario
    ]
    const resp=await query(sql,params)
    return resp
}

const saveToken=async(token,id_usuario)=>{

    let sql=`UPDATE usuarios SET token = ? WHERE id = ?`
    const params=[
        token,
        id_usuario
    ]
    const resp=await query(sql,params)
    return resp
}

const registerUser=async(body)=>{
    const crypto_password = crypto.createHash('sha1').update(body.password).digest('hex');
    const estado=1
    let sql =`INSERT INTO usuario (nombres,apellidos,tipo_documento,num_documento,celular,direccion,correo,password,imagen,estado,fecha_creacion) VALUES (?,?,?,?,?,?,?,?,?,?,now())`;
    const params=[
        body.nombres,
        body.apellidos,      
        body.tipo_documento,
        body.num_documento,      
        body.celular,      
        body.direccion,      
        body.correo,      
        crypto_password,      
        body.imagen,      
        estado
    ];
    await query(sql,params);

        


    sql = "SELECT * FROM usuario ORDER BY idusuario DESC LIMIT 1";
    const row = await query(sql);

    return row[0];

}

module.exports={
    saveToken,
    login,
    registerUser,
    saveIdCandidato,
    logout
}