const express = require("express");
const router = express.Router();
const { User } = require("../models");

//Obtener todos los proyectos
router.get("/", async (req, resp) => {
  try {
    const user = await User.findAll();
    resp.send(user);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

router.post("/", async (req, resp) => {
  try {
    const user = await User.create(req.body);
    return resp.send(user);
  } catch (error) {
    resp.status(400).send(error);
  }
});

module.exports = router;
