const query = require('../db/query');
const { generarJWT } = require('../helpers/generarJWT');
const crypto = require('crypto');
require('dotenv').config();


const existUser=async(usuario)=>{
    let sql=`SELECT COUNT(*) FROM registro WHERE usuario = "${usuario}"`
    const numEmail = await query(sql);
    
    if(Object.values(numEmail[0])[0] !== 0){
        return 'Usuario existe'
    }
    return
}

const validarSesionJWT=async(token,id_usuario)=>{
   
    let sql= `SELECT token FROM token WHERE id_usuario='${id_usuario}'`
    const resp=await query(sql);
    if(resp.length>0){
        if(resp[0].token!==token){
            return
        }else{
            return token
        }
    }else{
        return
    }
    
}

const guardarRegistro=async(body)=>{
    const crypto_password = crypto.createHash('sha1').update(body.password).digest('hex');
    const rol=2
    const estado=1
    let sql =`INSERT INTO registro (nombres,apellidos,usuario,tipoDocumento,numDocumento,id_rol,password,estado) VALUES (?,?,?,?,?,?,?,?)`;
    const params=[
        body.nombres,
        body.apellidos,      
        body.usuario,      
        body.tipoDocumento,      
        body.numDocumento,      
        rol,      
        crypto_password,
        estado     
    ];
    await query(sql,params);

    sql = "SELECT * FROM registro ORDER BY id DESC LIMIT 1";
    const row = await query(sql);

    return row[0];

}

const editarRegistro=async(body,numDocumento)=>{
    console.log({body})
    let sql
    if(body.password){
        console.log('entro por qui')
       const crypto_password = crypto.createHash('sha1').update(body.password).digest('hex');
       console.log({crypto_password})
       sql = `UPDATE registro SET password=? WHERE numDocumento="${numDocumento}"`;
       const params=[  
            crypto_password,   
        ];

    
        const resp=await query(sql, params);
        console.log('actualizado',resp.changedRows)
    }

    sql = `UPDATE registro SET nombres= ?, apellidos=?, tipoDocumento=? ,usuario=? WHERE numDocumento="${numDocumento}"`;
    const params=[
        body.nombres,
        body.apellidos,     
        body.tipoDocumento,      
        body.usuario,     
    ];
    const resp= await query(sql, params);

    if(resp.changedRows>0){
        return 'actualizado'
    }else{
        return
    }
    
}
const validateEditEmail=async(document,usuario)=>{
    let sql=`SELECT COUNT(*) FROM registro WHERE usuario= "${usuario}"`
    const numEmail = await query(sql);
    
    if(Object.values(numEmail[0])[0] !== 0){
        sql = `SELECT * FROM registro WHERE usuario= "${usuario}"`;
        const row = await query(sql);

        if(row[0].numDocumento===document){
            return true
        }else{
            return false
        }
    }else{
        return true
    }


   
}
const deleteUser=async(id)=>{
    let sql = `UPDATE registro SET estado= ? WHERE numDocumento="${id}"`;
    const estado=0
    const params=[
        estado   
    ];
    const resp= await query(sql, params);

    if(resp.changedRows>0){
        return 'eliminado'
    }else{
        return
    }
}
const getVigilantes=async(filters,pages=1,pageSizes=10)=>{
    let page = parseInt(pages) || 1;
    const pageSize = parseInt(pageSizes) || 10;
  
    // Verificar que la página no sea menor que 1
    page = Math.max(1, page)

    let consulta=`SELECT COUNT(*) FROM registro WHERE id_rol="2" AND estado="1"`
    const resp = await query(consulta)
    const totalRows=Object.values(resp[0])[0]
    
    const offset = (page - 1) * pageSize;
    let sql = `SELECT nombres,apellidos,tipoDocumento,numDocumento,usuario FROM registro WHERE id_rol="2" AND estado="1"`;
    const pagination = [pageSize,offset];
    
    try {
      const resp = await query(sql,null,filters,pagination,'DESC');
      return {resp,totalRows};
    } catch (error) {
      // Manejar el error aquí
      console.error('Error al obtener logs de vehículos:', error);
      throw error;
    }
    
}
const getVigilantesId=async(numDocumento)=>{
    let sql = `SELECT nombres,apellidos,tipoDocumento,numDocumento,usuario FROM registro WHERE numDocumento="${numDocumento}"`;
    const resp= await query(sql);

    return resp
}
const generarIngresoVehiculo=async(placa,dni)=>{

    let sql=`SELECT COUNT(*) FROM log_vehiculos WHERE placa="${placa}" AND fecha_salida IS NULL`;
    const num = await query(sql);
    
    if(Object.values(num[0])[0] !== 0){
        return 
    }else{
        sql =`INSERT INTO log_vehiculos (fecha_entrada,dni_vigilante_ingreso,placa) VALUES (NOW(),?,?)`;
        const params=[
            dni,
            placa     
        ];
        console.log({params})
        await query(sql,params);

        sql = "SELECT * FROM log_vehiculos ORDER BY id DESC LIMIT 1";
        const row = await query(sql);

        return row[0];

    }
    
    
}
const generarSalidaVehiculo=async(placa,dni)=>{
    let sql=`SELECT COUNT(*) FROM log_vehiculos WHERE placa="${placa}" AND fecha_salida IS NULL`;
    const num = await query(sql);
    
    if(Object.values(num[0])[0] === 0){
        return 'No ha ingresado'
    }else{
        sql = `UPDATE log_vehiculos SET fecha_salida= NOW(), dni_vigilante_salida= ? WHERE placa="${placa}" AND fecha_salida IS NULL`;
   
        const params=[
            dni   
        ];
        const resp= await query(sql, params);

        if(resp.changedRows>0){
            return 'salida exitosa'
        }else{
            return 
        }

    }
    
    
}

/* const getLogsVehiculos=async()=>{
    sql = "SELECT placa,fecha_entrada,dni_vigilante_ingreso,fecha_salida,dni_vigilante_salida FROM log_vehiculos ORDER BY id DESC";
    const resp= await query(sql);
    
    return resp
} */

const getLogsVehiculos = async (filters,pages = 1, pageSizes = 10) => {
    let page = parseInt(pages) || 1;
    const pageSize = parseInt(pageSizes) || 10;
  
    // Verificar que la página no sea menor que 1
    page = Math.max(1, page)

    let consulta=`SELECT COUNT(*) FROM log_vehiculos`
    const resp = await query(consulta)
    const totalRows=Object.values(resp[0])[0]
  
    const offset = (page - 1) * pageSize;
    let sql = `SELECT placa, fecha_entrada, dni_vigilante_ingreso, fecha_salida, dni_vigilante_salida FROM log_vehiculos`;
    const pagination = [pageSize,offset];
    try {
      const resp = await query(sql, null,filters,pagination,'DESC');
      return {resp,totalRows};
    } catch (error) {
      // Manejar el error aquí
      console.error('Error al obtener logs de vehículos:', error);
      throw error;
    }
  };






module.exports={
    existUser,
    validarSesionJWT,
    guardarRegistro,
    editarRegistro,
    validateEditEmail,
    deleteUser,
    getVigilantes,
    getVigilantesId,
    generarIngresoVehiculo,
    generarSalidaVehiculo,
    getLogsVehiculos
}
