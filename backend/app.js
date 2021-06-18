const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/user", require("./routes/UserRoutes.js"));
app.use("/group", require("./routes/GroupRoutes.js"));
app.use("/report", require("./routes/ReportRoutes.js"));

app.listen(8000, console.log("el servidor esta corriendo en el puerto 8000"));
