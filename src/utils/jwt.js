const jwt = require("jsonwebtoken");

// Este va a ser el fichero donde configuraremos jwt
// Vamos a tener la función de generar la llave, que la utilizaremos en el login


const generarLlave = (id)=>{
    // en .sign le vamos a indecar a jwt como tiene que hacer la llave.
    // esta funcion necesita el id, la secret key, que está almacenada de forma segura en .env
    // El tercer parámetro (opcional) es dentro de cuanto tiempo se autodestruye la llave.
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "1y"})
}



// Vamos a hacer la de verificarLlave para utilizarla en los middlewares cuando sea necesario
// Recordar que los middlewares son funciones que estan pensadas para ejecutarse dentro de las rutas donde sea invocado.
// Entonces, lo que va a hacer es, en ciertas peticiones, comprobar que el usuario esté loguead
// Si no da error, ya es que el token es correcto.
//                      llave
const verificarLlave = (token)=>{
    return jwt.verify({token}, process.env.SECRET_KEY)
}



module.exports = { generarLlave, verificarLlave}