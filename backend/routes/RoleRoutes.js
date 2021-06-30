const express = require("express");
const router = express.Router();
const { Role, User } = require("../models");

// Obtener todos los roles
router.get("/", async (req, resp) => {
  try {
    const roles = await Role.findAll();
    resp.send(roles);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Obtener todos los usuarios para cada rol
router.get("/list", async (req, resp) => {
  try {
    const roles = await Role.findAll({ include: User });
    resp.send(roles);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Crear Rol
router.post("/create", async (req, resp) => {
  try {
    // Revisar si el rol ya existe
    const roleExist = await Role.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (roleExist) return resp.status(401).send("El rol ya existe.");
    const role = await Role.create(req.body);
    resp.send(role);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Cambiar Rol a usuario
router.post("/change", async (req, resp) => {
  try {
    // Se asume que el rol y usuario existen
    const role = await Role.findOne({ where: { name: req.body.role } });
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user.Role == role) return resp.send("El usuario ya tiene este rol");
    user.id_rol = role.id;
    user.save();
    resp.send("success");
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

module.exports = router;
