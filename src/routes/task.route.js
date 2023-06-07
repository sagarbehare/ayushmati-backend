const express = require("express");
const Task = require("../models/task.model");
const Patient = require("../models/patient.model");
const router = express.Router();

router.post("/createPatientTask", async (req, res) => {
  const { newTask } = req.body;
  console.log(newTask);
  console.log(newTask.inTakeTime);
  const patientID = newTask.patientID;
  const primaryNurse = newTask.primaryNurse;
  const medicineType = newTask.medicineType;
  const medicineName = newTask.medicine;
  const inTakeTime = newTask.inTakeTime;
  const doctorInstructions = newTask.doctorInstructions;
  const status = "NOT COMPLETED";
  const task = new Task({
    patientID,
    primaryNurse,
    medicineType,
    medicineName,
    inTakeTime,
    doctorInstructions,
    status,
  });
  try {
    await task.save();
    console.log("task saved " + task._id);
    res
      .status(201)
      .json({ taskID: task._id, message: "Patient Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/patientTaskList", async (req, res) => {
  const { patientID } = req.body;
  console.log(patientID);
  let response = {}
  try {
   await Task.find({ patientID: patientID })
      .then((task) => {
        response = {...response,task:task};
        console.log(response)
      })
      .catch((error) =>
        res.status(500).json({ error: "Internal server error" })
      );

      
      console.log(response)
    const patient = await Patient.findById(patientID);
    if (patient) {
        response= {...response,patient}
        console.log(response)
      res.json({task:response.task,patientData:patient});
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
