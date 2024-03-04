const User = require("../api/models/user");
const { verificarLlave } = require("../utils/jwt");

const isAuth = async (req,res,next) => {
    try{
        // Vamos primero a obtener el token, que vendrá en los headers del req.
        // Es "Bearer sdffsfyb3rw78e5fw1rffw.gthuijaasxefefgih68ugvfnert2rt6tyi2g6sfereynujs.wieurytfsr84y2rdef4gth"
        // entonces le hacemos el split para quedarnos solo con el encriptado.
        // tambien se podria hacer con req.headers.authorization.replace("Bearer ", "");
        const token = req.headers.authorization.split(" ")[1];
        
        // intentar abrir la puerta
        const parsedToken = verificarLlave(token);
        const {id} = parsedToken;
        // ya abrió la puerta, devuelve un objeto con el id del usuario que creo la llave, el token, cuando fue creada y cuando expira.
        // Ahora ya tenemos el id
        var user = await User.findById(id); // AWAIT!!! Esto me dio varios problemas, pero finalmente funciona bien.
        // Si encuentra un usuario con ese id, es que existe y está logueado.
    
        user.password = null;// Solo para que no se pueda ver (aunque esté encriptada). No es que se borre ni desaparezca.
        req.user = user; // Para saber qué usuario ha realizado qué peticion
        console.log("Autenticación correcta");
        next(); // Que siga con el siguiente middleware(si lo hay) y sino al return de la ruta.

    }catch(err){
        return res.status(400).json({message: err.message});
    }
}
module.exports = {isAuth}