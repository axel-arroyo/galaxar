const express = require("express");
const router = express.Router();
const { User, Machine } = require("../models");

// Obtener todas las capacitaciones de un usuario
router.post("/info", async (req, resp) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      },
      include: [{
        model: Machine,
        through: {attributes: []},
        attributes: ['type']
      }]
    });
    resp.send(user.Machines);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Agregar capacitación a un usuario
router.post("/add", async (req, resp) => {
  try {
    // Se asume que existe el usuario y la máquina
    const user = await User.findOne({where: {email: req.body.email}});
    const machine = await Machine.findOne({where: {type: req.body.type}})
    user.addMachine(machine);
    resp.send("success");
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

// Agregar maquina
router.post("/newMachine", async (req, resp) => {
  try {
    // Revisar si la maquina ya existe
    const machineExist = await Machine.findOne({
      where: {
        type: req.body.type
      }
    });
    if (machineExist) return resp.status(401).send("La máquina ya existe");
    const machine = await Machine.create(req.body)
    resp.send(machine);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});


module.exports = router;