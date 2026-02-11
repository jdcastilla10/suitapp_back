const query = require("../db/query");
const { makeValidation } = require("../helpers/utilities");

const validateFields =async (req,res,next)=>{
    const { errors, checkErrors } =  makeValidation(req.body);
    if(checkErrors>0){
        return res.status(400).json({ success:false, errors });
    }
    next()

}

const validateEmail=async(req,res,next)=>{

    let sql=`SELECT COUNT(*) FROM usuario WHERE correo = "${req.body.correo}" AND estado="1"`
    const numEmail = await query(sql);


    if(Object.values(numEmail[0])[0] !== 0){
        return res.status(400).json({ success:false, errors:{'usuario':'El correo ya se encuentra registrado'} });
    }
    next()
}


const validateDni=async(req,res,next)=>{

    let sql=`SELECT COUNT(*) FROM usuario WHERE num_documento = "${req.body.num_documento}" AND estado="1"`
    const numDocumento = await query(sql);
    sql=`SELECT * FROM usuario WHERE num_documento = "${req.body.num_documento}" AND estado="1"`
    const resp = await query(sql);

    console.log(resp)

    if(Object.values(numDocumento[0])[0] !== 0){
        return res.status(400).json({ success:false, errors:{'documento':'El documento ya se encuentra registrado'} });
    }
    next()
}

const validateEmailUpdate=async(req,res,next)=>{
    let sql =`SELECT email FROM usuarios WHERE id=${req.params.id}`
    const validate = await query(sql);
    
    if(validate[0].email !== req.body.email){
        validateEmail(req,res,next)
    }else{
        next()
    }
    
}



const validateDeleteUser=async(req,res,next)=>{
    //console.log(req.params.id)
    let sql=`SELECT state FROM usuarios WHERE id = ${req.params.id}`
    const usuarios = await query(sql);

    if(Object.values(usuarios[0])[0] === 1){
        return res.status(400).json({ success:false, errors:{'id':'El usuario ya fue eliminado de la base de datos'} });
    }
    next()
}



module.exports={
    validateFields,
    validateEmail,
    validateEmailUpdate,
    validateDeleteUser,
    validateDni,

}