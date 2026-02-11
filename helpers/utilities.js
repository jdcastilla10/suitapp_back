
const isEmail = (email)=>{
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

const isNumeric = (value) =>{
    if (Number(value)) {
        return true;
    }else{
        return false;
    }
}

const isDate = (date) =>{

    const values = date.split("-");
    const checkDate = new Date(values[0], values[1], values[2]);
    if(values.length == 3 && !isNaN(checkDate)){
        return true;
    }

    return false;
}


const makeValidation = (req)=>{

    if( (Object.keys(req)).length == 0){
        return { 
            errors:{
                body:"No hay datos en el cuerpo de la petición"
            },
            checkErrors:1
        }
    }

    let errors = {};
    Object.keys(req).forEach(key=>{
        errors[key] = "";
    });


    if(typeof req["correo"] !== 'undefined') {
        if(req["correo"].trim()==""){
            errors["correo"] = "El correo electrónico es requerido";
        }else if (!isEmail(req["correo"])) {
            errors["correo"] = "Dígite un correo electrónico válido";
        }
    }

    if(typeof req["celular"] !== 'undefined') {
        if(req["celular"].trim()==""){
            errors["celular"] = "El célular es requerido";
        }else if(!isNumeric(req["celular"])){
            errors["celular"] = "El célular debe ser un número";
        }else if(req["celular"].length!=10){
            errors["celular"] = "El célular debe tener 10 dígitos";
        }
    }

    if(typeof req["password"] !== 'undefined') {
        if(req["password"].trim()==""){
            errors["password"] = "La contraseña es requerida";
        }else if(req["password"].length<5){
            errors["password"] = "La contraseña debe tener al menos 8 caracteres";
        }else if(req["password"].length>30){
            errors["password"] = "La contraseña no debe tener mas de 30 caracteres";
        }
    }
    if(typeof req["usuario"] !== 'undefined') {
        if(req["usuario"].trim()==""){
            errors= "El usuario es requerido";
        }else if(req["usuario"].length<4){
            errors = "El usuario no es válido";
        }
    }
    if(typeof req["nombres"] !== 'undefined') {
        if(req["nombres"].trim()==""){
            errors["nombres"] = "El nombre es requerido";
        }else if(req["nombres"].length<3){
            errors["nombres"] = "El nombre debe tener al menos 3 caracteres";
        }
    }
    if(typeof req["segundoNombre"] !== 'undefined') {
        if(req["segundoNombre"].trim()==""){
            errors["segundoNombre"] = "El segundo nombre es requerida";
        }else if(req["segundoNombre"].length<3){
            errors["segundoNombre"] = "El segundo nombre debe tener al menos 3 caracteres";
        }
    }
    if(typeof req["apellidos"] !== 'undefined') {
        if(req["apellidos"].trim()==""){
            errors["apellidos"] = "El apellido es requerido";
        }else if(req["apellidos"].length<3){
            errors["apellidos"] = "El apellido debe tener al menos 3 caracteres";
        }
    }
    if(typeof req["segundoApellido"] !== 'undefined') {
        if(req["segundoApellido"].trim()==""){
            errors["segundoApellido"] = "El segundo apellido es requerida";
        }else if(req["segundoApellido"].length<3){
            errors["segundoApellido"] = "El segundo apellido debe tener al menos 3 caracteres";
        }
    }
    if(typeof req["tipo_documento"] !== 'undefined') {
        if(req["tipo_documento"].trim()==""){
            errors["tipo_documento"] = "El tipo de documento es requerido";
        }else if(req["tipo_documento"].length<2){
            errors["tipo_documento"] = "El tipo documento debe tener al menos 2 caracteres";
        }
    }
    if(typeof req["id_usuario"] !== 'undefined') {
        if(req["id_usuario"].length==0){
            errors["id_usuario"] = "El id_usuario es requerida";
        }else if(!isNumeric(req["id_usuario"])){
            errors["id_usuario"] = "El id_usuario debe ser un número";
        }
    }
    if(typeof req["num_documento"] !== 'undefined') {
        if(req["num_documento"].trim()==""){
            errors["num_documento"] = "El número de documento es requerido";
        }else if(req["num_documento"].length<5){
            errors["num_documento"] = "El número de documento debe tener al menos 5 números";
        }
    }
    if(typeof req["direccion"] !== 'undefined') {
        if(req["direccion"].trim()==""){
            errors["direccion"] = "La dirección es requerida";
        }else if(req["direccion"].length<5){
            errors["direccion"] = "Ingrese una dirección válida";
        }
    }
    if(typeof req["sexo"] !== 'undefined'){
        if(req["sexo"].trim()==""){
            errors["sexo"] = "El sexo es requerido";
        }else if(req["sexo"]!="M" && req["sexo"]!="F" ){
            errors["sexo"] = "El sexo debe ser M o F";
        }
    }
    if(typeof req["estado"] !== 'undefined') {
        if(req["estado"].trim()==""){
            errors["estado"] = "EL estado es requerido";
        }
    }
    if(typeof req["tokenqr"] !== 'undefined') {
        if(req["tokenqr"].trim()==""){
            errors["tokenqr"] = "EL token del qr es requerido";
        }
    }
    if(typeof req["codigoEmail"] !== 'undefined') {
        if(req["codigoEmail"].trim()==""){
            errors["codigoEmail"] = "EL codigoEmail es requerido";
        }else if(req["codigoEmail"].length !== 6){
            errors["codigoEmail"] = "El codigoEmail debe tener 6 números";
        }
    }
    if(typeof req["codigoCelular"] !== 'undefined') {
        if(req["codigoCelular"].trim()==""){
            errors["codigoCelular"] = "EL codigoCelular es requerido";
        }else if(req["codigoCelular"].length !== 4){
            errors["codigoCelular"] = "El codigoCelular debe tener 4 números";
        }
    }
    if(typeof req["grupoSanguineo"] !== 'undefined') {
        if(req["grupoSanguineo"].trim()==""){
            errors["grupoSanguineo"] = "La grupo sanguineo es requerido";
        }
    }
    if(typeof req["programaAcademico"] !== 'undefined') {
        if(req["programaAcademico"].trim()==""){
            errors["programaAcademico"] = "El programa académico es requerido";
        }
    }
    

    let checkErrors = 0;
    Object.values(errors).forEach(values=>{
        if(values!=""){
            checkErrors++;
        }
    });

    return {errors,checkErrors};
}


module.exports = {
    makeValidation,
}