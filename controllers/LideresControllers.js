const { response,request} = require('express')
const { guardarRegistro, editarRegistro, existUser, validateEditDocument, deleteUser, getVigilantes, getLiderName, generarSalidaVehiculo, generarIngresoVehiculo, getLogsVehiculos, validateEditEmail } = require('../models/Lideres')


const getLeaderByName=async(req=request, res=response)=> {
    const { name,candidato } = req.query
    console.log(name,candidato)
    const resp= await getLiderName(name,candidato)


    res.json({
        success:true,
        data:resp
    })
}





module.exports = {
 getLeaderByName
}