const express = require("express");
const cors = require("cors");
require("dotenv").config();
let corsOptions = {
    origin: "http://localhost:3000", // SonarQube security fix
  };

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.enable("trust proxy");
app.use(express.json());

app.use("/user", require("./routes/UserRoutes.js"));
app.use("/group", require("./routes/GroupRoutes.js"));
app.use("/report", require("./routes/ReportRoutes.js"));

app.listen(8000, console.log("el servidor esta corriendo en el puerto 8000"));
