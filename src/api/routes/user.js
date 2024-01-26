const { isAuth } = require("../../middlewares/auth");
const { getUsers, getUserById, register, updateUser, login } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.get("/:id", getUserById);
usersRouter.get("/", getUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/:id", [isAuth] , updateUser );

module.exports = usersRouter;