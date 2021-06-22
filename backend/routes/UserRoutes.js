const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

// Obtener todos los usuarios
router.get("/", async (req, resp) => {
  try {
    const user = await User.findAll();
    resp.send(user);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Registro
router.post("/register", async (req, resp) => {
  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExist) return resp.status(400).send("Este usuario ya existe");
    const role = await Role.findOne({
      where: {
        name: req.body.role
      }
    });
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    // Crear usuario
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      carrera: req.body.carrera,
      campus: req.body.campus,
      sexo: req.body.sexo,
      ingresoU: req.body.ingresoU,
      id_rol: role.id
    });
    return resp.send(user);
  } catch (error) {
    resp.status(400).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: Role
    });
    if (!user) {
      return res.status(401).send("Usuario o contraseña equivocada");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send("Usuario o contraseña equivocada");
    const token = jwt.sign(
      { email: user.email, role: user.Role.name,name: user.name },
      process.env.SECRET_TOKEN
    );
    return res
      .header("Access-Control-Expose-Headers", "auth-token")
      .header("auth-token", token)
      .send(token);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
