const express = require("express");
const { addData, getAllData } = require("../controllers/espInforController");

const router = express.Router();

router.get("/espData", getAllData);

router.post("/espData", addData);

module.exports = {
  routes: router,
};
