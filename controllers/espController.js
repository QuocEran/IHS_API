"use strict";
const app = require("../db");
const uuid = require("uuid");
const Patient = require("../models/espInfor");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} = require("firebase/firestore/lite");

const db = getFirestore(app);

const addEsp = async (req, res, next) => {
  try {
    const data = req.body;
    const espId = req.query.espId;
    const timeInstance = new Date().getTime() / 1000;
    const stamp = timeInstance.toString();
    data.createdDate = stamp;
    data.espId = espId;
    await setDoc(doc(db, "esp", espId), data);
    res.status(201).json({ message: "Record saved successfuly" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getEsp = async (req, res, next) => {
  try {
    const espId = req.query.espId;
    const response = await getDoc(doc(db, "esp", espId));
    console.log(response.data());
    if (response.data() == null) throw new Error("Not found");
    res.status(200).json(response.data());
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addEsp,
  getEsp,
};
