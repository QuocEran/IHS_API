const express = require("express");
const { addPatient, getPatient } = require("../controllers/patientController");

const router = express.Router();

router.get("/patient", getPatient);

router.post("/patient", addPatient);

module.exports = {
  routes: router,
};
