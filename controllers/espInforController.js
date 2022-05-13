"use strict";

const app = require("../db");
const uuid = require("uuid");
const Patient = require("../models/espInfor");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  getDocs,
  collectionGroup,
} = require("firebase/firestore/lite");

const db = getFirestore(app);

const addData = async (req, res, next) => {
  try {
    const data = req.body;
    let status = "Normal";
    const espId = req.query.espId;
    const patientId = req.query.patientId;
    if (parseFloat(data.HeartBeat) < 40 || parseFloat(data.HeartBeat) > 100) {
      status = "Alert";
    } else if (parseFloat(data.Temp) > 37) {
      status = "Alert";
    } else if (parseFloat(data.SPO2) < 94) {
      status = "Alert";
    }
    console.log("POST: /espData", espId, patientId);
    const timeInstance = new Date().getTime() / 1000;
    const stamp = timeInstance.toString();
    data.TimeStamp = stamp;
    await setDoc(doc(db, "espData", espId, patientId, stamp), data);
    await updateDoc(doc(db, "patients", patientId), {
      status: status,
    });

    res.status(201).send("Record saved successfuly");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllData = async (req, res, next) => {
  try {
    const allEntries = [];
    const espId = req.query.id;
    const patientId = req.query.patientId;
    const q = query(collection(db, "espData", espId, patientId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addEsp = async (req, res, next) => {
  try {
    const data = req.body;
    const espId = req.headers.espId;
    const timeInstance = new Date().getTime() / 1000;
    const stamp = timeInstance.toString();
    data.createdDate = stamp;
    await setDoc(doc(db, "espData", espId), data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addData,
  getAllData,
};

