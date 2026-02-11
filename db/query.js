
const mysql = require("mysql2");
require('dotenv').config();


const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

const query = (sql, values = [], filters = null, paginacion = null,order)=>{

    return new Promise(( resolve, reject )=>{
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                if (filters) {
                    const conditions = Object.keys(filters).map(key => {
                        return `${key} LIKE '%${connection.escape(filters[key]).replace(/'/g, '')}%'`;
                    });
                    console.log('condic',conditions)
                    if(conditions.length>0){
                        const hasWhere = sql.toUpperCase().includes('WHERE');
                        
                        // Concatena la condición usando AND si ya existe WHERE, de lo contrario, usa WHERE
                        sql += hasWhere ? ' AND ' + conditions.join(' AND ') : ' WHERE ' + conditions.join(' AND ');
                    }
                }
                if(order==='DESC'){
                    console.log(paginacion)
                    sql += ` ORDER BY id DESC`
                }
                if(order==='ASC'){
                    console.log(paginacion)
                    sql += ` ORDER BY id ASC`
                }
               

                if(paginacion && paginacion.length === 2){
                    console.log(paginacion)
                    sql += ` LIMIT ${paginacion[0]} OFFSET ${paginacion[1]}`
                }
                
                console.log({sql,values})
                connection.query(sql, values, ( err, res) => {
         
                    if ( err ) {
                        reject( err )
                    } else {
                        const rows = JSON.parse(JSON.stringify(res));
                        resolve( rows )
                    }
                    connection.release();
                })
            }
        });
    });
}

module.exports = query;