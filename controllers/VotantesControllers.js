const { response,request} = require('express')
const { getVoterDni, editarVotante, getAllVoterByCandidate} = require('../models/Votantes')


const getVoterByDni=async(req=request, res=response)=> {
    const { dni,codlid,candidato } = req.query
    console.log(dni,codlid,candidato)
    const resp= await getVoterDni(dni,codlid,candidato)


    res.json({
        success:true,
        data:resp
    })
}



const updateVoterState=async(req=request, res=response)=> {
    const { dni,candidato,codusu } = req.query

    const resp = await editarVotante(dni,candidato,codusu)

    res.json({
        success:true,
        data:resp
    })
}

const getVotersByCandidate=async(req=request, res=response)=> {
    const { candidato } = req.query

    const resp = await getAllVoterByCandidate(candidato)

    res.json({
        success:true,
        data:resp
    })
}





module.exports = {
    getVoterByDni,
    updateVoterState,
    getVotersByCandidate
    
}