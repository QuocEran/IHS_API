const express = require("express");
const { addEsp, getEsp } = require("../controllers/espController");

const router = express.Router();

router.post("/esp", addEsp);

router.get("/esp", getEsp);

module.exports = {
  routes: router,
};
