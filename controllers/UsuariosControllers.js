const { response,request} = require('express')
const { guardarRegistro, editarRegistro, existUser, validateEditDocument, deleteUser, getVigilantes, getVigilantesId, generarSalidaVehiculo, generarIngresoVehiculo, getLogsVehiculos, validateEditEmail } = require('../models/Usuarios')


const usuariosGet=(req=request, res=response)=> {

    const { nombre,apellido='no lastName' } =req.query

    res.json({
        success:true,
        message:'get api-controllers',
        nombre,
        apellido
    })
}

const registro_usuario=async(req=request, res=response)=> {

    const body=req.body

    const resp = await guardarRegistro(body)

    res.json({
        success:true,
        data:resp
    })
}

const actualizar_usuario=async(req=request, res=response)=> {
    const { id } = req.params
    const {nombres,apellidos,tipoDocumento,usuario} = req.body

    if(!nombres || !apellidos|| !tipoDocumento|| !usuario){
        return res.status(400).json({
            success:false,
            errors:'Se requiere enviar todos los campos'
        })
    }
    
    const body=req.body
    const validateDni=await validateEditEmail(id,usuario)
    
    if(!validateDni){
        return res.status(400).json({
            success:false,
            errors:'El email ya se encuentra registrado'
        })
    }
    
    const resp = await editarRegistro(body,id)

    res.json({
        success:true,
        data:resp
    })
}

const eliminar_usuario=async(req=request, res=response)=> {

    const { id } = req.body

    const resp= await deleteUser(id)

    if(!resp){
       return res.json({
        success:false,
        errors:'No se pudo eliminar el usuario'
    }) 
    }

    res.json({
        success:true,
        message:'Usuario eliminado correctamente'
    })
}

const listar_vigilantes=async(req=request, res=response)=> {
    
    const {name,lastName,dniType,dni,email}=req.query
    
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;


    const filters = {};

    if (name) {
        filters.nombres = name;
    }
    if (lastName) {
        filters.apellidos = lastName;
    }
    if (email) {
        filters.usuario = email;
    }
    if (dniType) {
        filters.tipoDocumento = dniType;
    }
    if (dni) {
        filters.numDocumento = dni;
    }

    const {resp,totalRows}= await getVigilantes(filters,page, pageSize)


    res.json({
        success:true,
        data:resp,
        total:totalRows
    })
}

const getVigilanteByDni=async(req=request, res=response)=> {
    const { dni } = req.params
    const resp= await getVigilantesId(dni)


    res.json({
        success:true,
        data:resp
    })
}
const logsVehiculos=async(req=request, res=response)=> {
    const {placa,entryDate,exitDate,entryWatchmen,exitWatchmen}=req.query
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    
    const filters = {};

    if (entryDate) {
        filters.fecha_entrada = entryDate;
    }
    if (placa) {
        filters.placa = placa;
    }
    if (exitDate) {
        filters.fecha_salida = exitDate;
    }
    if (entryWatchmen) {
        filters.dni_vigilante_ingreso = entryWatchmen;
    }
    if (exitWatchmen) {
        filters.dni_vigilante_salida = exitWatchmen;
    }

    const {resp,totalRows}= await getLogsVehiculos(filters,page, pageSize);
    console.log({resp,totalRows})

    res.json({
        success:true,
        data:resp,
        total:totalRows
    })
}



const ingresarVehiculo=async(req=request, res=response)=> {
    const { placa,dni } = req.body
    const resp= await generarIngresoVehiculo(placa,dni)

    if(!resp){
        return res.json({
            success:false,
            message:'Este vehículo ya fue ingresado'
        })
    }

    res.json({
        success:true,
        data:resp
    })
}

const salidaVehiculo=async(req=request, res=response)=> {
    const { placa,dni } = req.body
    const resp= await generarSalidaVehiculo(placa,dni)


    if(!resp){
        return res.json({
            success:false,
            message:'No se pudo registrar la salida del vehículo, vuelva a intentar'
        })
    }
    if(resp==='No ha ingresado'){
        return res.json({
            success:false,
            message:'Este vehículo no ha ingresado'
        })
    }

    res.json({
        success:true,
        data:resp
    })
}



module.exports = {
    usuariosGet,
    registro_usuario,
    eliminar_usuario,
    actualizar_usuario,
    eliminar_usuario,
    listar_vigilantes,
    getVigilanteByDni,
    ingresarVehiculo,
    salidaVehiculo,
    logsVehiculos
}