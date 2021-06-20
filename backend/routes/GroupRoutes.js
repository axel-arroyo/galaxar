const express = require("express");
const router = express.Router();
const { User, Group } = require("../models");

//Obtener todos los grupos
router.get("/", async (req, resp) => {
  try {
    const groups = await Group.findAll();
    resp.send(groups);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Obtener todos los grupos con sus usuarios
router.get("/list", async (req, resp) => {
  try {
    const groups = await Group.findAll({ include: User });
    resp.send(groups);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Crear un grupo
router.post("/", async (req, resp) => {
  try {
    const group = await Group.create(req.body);
    return resp.send(group);
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Agregar alumno a un grupo
router.post("/add", async (req, resp) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    const group = await Group.findOne({
      where: {
        description: req.body.description,
      },
    });
    user.addGroup(group);
    return resp.send("success");
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
