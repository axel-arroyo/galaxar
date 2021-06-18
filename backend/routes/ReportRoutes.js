const express = require("express");
const router = express.Router();
const { Report } = require("../models");

//Obtener todos los reportes
router.get("/", async (req, resp) => {
  try {
    const reportes = await Report.findAll();
    resp.send(reportes);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

//Crear un reporte
router.post("/", async (req, resp) => {
  try {
    const reporte = await Report.create(req.body);
    return resp.send(reporte);
  } catch (error) {
    resp.status(400).send(error);
  }
});

//Traer todos los reportes de un usuario de id
router.get("/reportes/:id", async (req, resp) => {
  try {
    const reportes = await Report.findAll({
      where: {
        idusuario: req.params.id,
      },
    });
    resp.send(reportes);
  } catch (error) {
    resp.status(400).send("Error al hacer una query a la base de datos");
  }
});

module.exports = router;
