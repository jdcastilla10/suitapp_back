const query = require('../db/query');
const { generarJWT } = require('../helpers/generarJWT');
const crypto = require('crypto');
require('dotenv').config();



const getLideres=async(filters,pages=1,pageSizes=10)=>{
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
const getLiderName = async (name,candidato) => {
 console.log({candidato})
  var sql

  if(candidato==='1'){
    var sql = `
    SELECT codlid, nomlid, apelid
    FROM \`lideres-jose\`
    WHERE nomlid LIKE ? LIMIT 30
  `;
  }
  if(candidato==='2'){
    var sql = `
    SELECT codlid, nomlid, apelid
    FROM \`lideres-prin\`
    WHERE nomlid LIKE ? LIMIT 30
  `;
  }
  if(candidato==='3'){
    var sql = `
    SELECT codlid, nomlid, apelid
    FROM \`lideres-elver\`
    WHERE nomlid LIKE ? LIMIT 30
  `;
  }
  if(candidato==='4'){
    var sql = `
    SELECT codlid, nomlid, apelid
    FROM \`lideres-baq\`
    WHERE nomlid LIKE ? LIMIT 30
  `;
  }
  

  const values = [`%${name}%`];
  
  const resp = await query(sql, values);
  console.log(resp)
  return resp;
};


module.exports={
    getLideres,
    getLiderName,
   
}
