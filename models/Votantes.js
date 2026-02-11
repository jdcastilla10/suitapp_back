const query = require('../db/query');
const { generarJWT } = require('../helpers/generarJWT');
const crypto = require('crypto');
require('dotenv').config();



const editarVotante=async(dni,candidato)=>{
   var sql
   if(candidato==='1'){
    var sql = `
    UPDATE \`votantes_jose\` SET ok= ? WHERE cedvot="${dni}"
  `;
  }
  if(candidato==='2'){
    var sql = `
    UPDATE \`votantes_prin\` SET ok= ? WHERE cedvot="${dni}"
  `;
  }
  if(candidato==='3'){
    var sql = `
    UPDATE \`votantes_elver\` SET ok= ? WHERE cedvot="${dni}"
  `;
  }
  if(candidato==='4'){
    var sql = 
    `UPDATE \`votantes_baq\` SET ok= ? WHERE cedvot="${dni}"`
  ;
  }
   
    const values = ['V',dni];
    const resp= await query(sql, values);

    if(resp.changedRows>0){
        return 'actualizado'
    }else{
        return
    }
    
}

const getVotantes=async(filters,pages=1,pageSizes=10)=>{
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
const getVotanteId=async(numDocumento)=>{
    let sql = `SELECT nombres,apellidos,tipoDocumento,numDocumento,usuario FROM registro WHERE numDocumento="${numDocumento}"`;
    const resp= await query(sql);

    return resp
}

const getVoterDni = async (dni,codlid,candidato) => {
 console.log({candidato})
  var sql

  if(candidato==='1'){
    var sql = `
    SELECT cedvot,nomvot,apevot, ok,codusu
    FROM \`votantes_jose\`
    WHERE cedvot LIKE ?
    AND codlid = ? LIMIT 25
  `;
  }
  if(candidato==='2'){
    var sql = `
    SELECT cedvot,nomvot,apevot, ok,codusu
    FROM \`votantes_prin\`
    WHERE cedvot LIKE ?
    AND codlid = ? LIMIT 25
  `;
  }
  if(candidato==='3'){
    var sql = `
    SELECT cedvot,nomvot,apevot, ok,codusu
    FROM \`votantes_elver\`
    WHERE cedvot LIKE ?
    AND codlid = ? LIMIT 25
  `;
  }
  if(candidato==='4'){
    var sql = `
    SELECT cedvot,nomvot,apevot, ok,codusu
    FROM \`votantes_baq\`
    WHERE cedvot LIKE ?
    AND codlid = ? LIMIT 25
  `;
  }
  

  const values = [`%${dni}%`,codlid];
  
  const resp = await query(sql, values);
  console.log(resp)
  return resp;
};



module.exports={
    editarVotante,
    getVotantes,
    getVotanteId,
    getVoterDni
   
}
