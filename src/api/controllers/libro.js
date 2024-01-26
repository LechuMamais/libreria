const Libro = require("../models/libro");

const getLibros = async (req, res, next) => {
    try{
        const libros = await Libro.find();
        return res.status(200).json(libros);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const getLibroById = async (req, res, next) => {
    try{
        const {id} = req.params;
        const libro = await Libro.findById(id);
        return res.status(200).json(libro);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const postLibro = async (req, res, next) => {
    try{
        const newLibro = await new Libro(req.body);
        const libro = await newLibro.save();
        return res.status(201).json(libro);

    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const putLibro = async (req, res, next) => {
    try{
        const {id} = req.params;
        const newLibro = await new Libro(req.body);
        newLibro._id = id;
        const libroUpdated = await Libro.findByIdAndUpdate(id, newLibro, {new: true});
        return res.status(200).json(libroUpdated);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

const deleteLibro = async (req, res, next) => {
    try{
        const {id} = req.params;
        const libro = await Libro.findByIdAndDelete(id);
        return res.status(200).json({
            mensaje: "Ha sido eliminado con éxito el libro",
            libroEliminado: libro
        });
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports = {
    getLibros,
    getLibroById,
    postLibro,
    putLibro,
    deleteLibro
}