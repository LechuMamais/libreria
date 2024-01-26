const { generarLlave } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

const getUserById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

const register = async (req, res, next) => {
    try{
        const newUser = await new User(req.body);
        const userDuplicated = await User.findOne({userName: req.body.userName});
        if(userDuplicated){
            return res.status(400).json("usuario ya registrado!")
        }
        const user = await newUser.save();
        return res.status(201).json(user);

    }catch(err){
        return res.status(400).json({message: err.message});
    }
}
 
const login = async (req, res, next) => {
    try{
        const  { userName, password } = req.body;

        const user = await User.findOne({ userName });

        if(!user){
            return res.status(400).json("Usuario no encontrado");
        }

        // Esta funcion automaticamente compara las contraseñas, y devuelve un boolean
        if(bcrypt.compareSync(password, user.password)){
            // Logica interna del Login
            // Primero va la comprobacion de contraseña, que se hace ocn jwt json web token

            const token = generarLlave(user._id);
            // que nos devuelva el usuario y su token. Este token es el que genera jwt, que tiene informacion encriptada
            // Es la llave para abrir las puertas - middlewares
            return res.status(200).json({token, user});

        }

        return res.status(400).json("Usuario o contraseña incorrectos");
        
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

const updateUser = async (req, res, next) => {
    try{

        const {id} = req.params;
        console.log(req.user._id.toString());

        if(req.user._id.toString() != id){
            return res.status(400).json("No puedes modificar un usuario que no seas tu mismo");
        } 

        const newUser = await new User(req.body);
        newUser._id = id;
        // Para que al modificar algun dato del usuario no se pierda su array de libros favoritos, vamos a defirle que su
        // array de favoritos sea el del anterior mas los nuevos.
        // Esto aplica incluso para la funcion de agregarle libros favoritos al usuario.
        const oldUser = await User.findById(id);
        newUser.favoritos = [... oldUser.favoritos, ... newUser.favoritos];
        const userUpdated = await User.findByIdAndUpdate(id, newUser, {new: true});

        return res.status(200).json(userUpdated);


    }catch(err){
        
        return res.status(400).json("No capo, no estas autorizado!!",{message: err.message});
    }
}


module.exports = {
    getUsers,
    getUserById,
    register,
    updateUser,
    login
}