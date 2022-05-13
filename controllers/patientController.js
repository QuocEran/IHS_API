"use strict";
const app = require("../db");
const uuid = require("uuid");
const Patient = require("../models/patient");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  getDocs,
  collectionGroup,
} = require("firebase/firestore/lite");
const { format } = require("date-fns");

const db = getFirestore(app);

const addPatient = async (req, res, next) => {
  try {
    const data = req.body;
    const Patient = req.headers.patient;
    const stamp = format(new Date(), "Ppp");
    data.createdDate = stamp;
    await setDoc(doc(db, "patients", Patient), data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getPatient = async (req, res, next) => {
  try {
    const allEntries = [];
    const q = query(collectionGroup(db, "patients"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  addPatient,
  getPatient,
};

