const { response,request} = require('express')
const { guardarRegistro, editarRegistro, existUser, validateEditDocument, deleteUser, getVigilantes, getLiderName, generarSalidaVehiculo, generarIngresoVehiculo, getLogsVehiculos, validateEditEmail } = require('../models/Lideres')


// const getLeaderByName=async(req=request, res=response)=> {
//     const { name,candidato } = req.query
//     console.log(name,candidato)
//     const resp= await getLiderName(name,candidato)


//     res.json({
//         success:true,
//         data:resp
//     })
// }

const getLeaderByName = async (req=request, res=response) => {
  try {
    const { name, candidato } = req.query;

    console.log("QUERY:", name, candidato);

    const resp = await getLiderName(name, candidato);

    return res.json({
      success: true,
      data: resp
    });

  } catch (error) {
    console.error("ERROR EN CONTROLADOR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





module.exports = {
 getLeaderByName
}