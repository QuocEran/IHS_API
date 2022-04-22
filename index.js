"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const patientRoutes = require("./routes/patient-routes");
const espDataRoutes = require("./routes/espData-routes");
const espRoutes = require("./routes/esp-routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", patientRoutes.routes);
app.use("/api", espDataRoutes.routes);
app.use("/api", espRoutes.routes);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(config.port, () =>
  console.log("App is listening on port" + config.port)
);
