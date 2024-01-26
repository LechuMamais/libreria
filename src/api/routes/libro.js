const { isAuth } = require("../../middlewares/auth");
const { putLibro, postLibro, getLibroById, getLibros, deleteLibro } = require("../controllers/libro");

const librosRouter = require("express").Router();

librosRouter.get("/:id", getLibroById);
librosRouter.get("/", getLibros);
librosRouter.post("/", [isAuth] , postLibro);
librosRouter.put("/:id", [isAuth] , putLibro);
librosRouter.delete("/:id", [isAuth] , deleteLibro);

module.exports = librosRouter;