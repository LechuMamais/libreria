require("dotenv").config();

const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/user");
const librosRouter = require("./src/api/routes/libro");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/libros", librosRouter);
app.use("/api/v1/users", usersRouter)

app.use("/ping", (rez, res, next)=> {
    return res.status(200).json("pong");
});

app.use("*", (req, res, next)=>{
    return res.status(404).json("Route not found");
});
app.listen(3000, ()=>{
    console.log("Servidor conrriendo en http://localhost:3000");
});