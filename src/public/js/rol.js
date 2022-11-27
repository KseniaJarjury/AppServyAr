const classUser = require('../../models/users');

function clickCliente(req,res){
    console.log("cliente")
    let user = req.user;
    user.updateRol("cliente");
}
function clickOferente(req,res){
    console.log("oferente")
    let user = req.user;
    user.updateRol("oferente");
}

