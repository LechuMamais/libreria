const User = require("../api/models/user");
const { verificarLlave } = require("../utils/jwt");

const isAuth = (req,res,next) => {
    try{

        // vamos primero a obtener el token, que vendrá en los headers del req.
        // Es "Bearer token" entonces le hacemos el split. tambien se podria hacer con req.headers.authorization.replace("Bearer ", "");
        const token = req.headers.authorization.split(" ")[1];
        
        // intentar abrir la puerta
        verificarLlave(token);
        // ya abrió la puerta, devuelve un objeto con id del usuario que creo la llave, el token, cuando fue creada y cuando expira.
        const {id} = token;
        const user = User.findById(id);

        user.password = null;// Solo para que no se pueda ver! No es que se borre ni desaparezca.
        req.user = user; // Para saber qué usuario ha realizado qué peticion
        next();


        return res.json("Estas autorizado! Puerta abierta",);

    }catch(err){
        return res.status(400).json({message: err.message});
    }

}
module.exports = {isAuth}