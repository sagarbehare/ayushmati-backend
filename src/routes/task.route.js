const express = require("express");
const Task = require("../models/task.model");
const Patient = require("../models/patient.model");
const { ObjectId } = require("bson");
const router = express.Router();
const moment = require("moment");

router.post("/createPatientTask", async (req, res) => {
  const { newTask } = req.body;
  console.log(newTask);
  console.log(newTask.inTakeTime);
  console.log(newTask.primaryNurse);
  const patientID = newTask.patientID;
  const primaryNurseID = newTask.primaryNurseID;
  const primaryNurse = newTask.primaryNurse;
  const medicineType = newTask.medicineType;
  const medicineName = newTask.medicine;
  const inTakeTime = newTask.inTakeTime;
  const doctorInstructions = newTask.doctorInstructions;

  const status = "Pending";

  const task = new Task({
    patientID,
    primaryNurseID,
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

  // let currentDate = moment(new Date()).format("YYYY-MM-DD");
  // currentDate = moment(currentDate).subtract(1, "day");
  // currentDate = moment(currentDate).format("YYYY-MM-DD");
  // console.log('Current Date :: '+ currentDate);


  // let nextDate = moment(new Date()).format("YYYY-MM-DD");
  // nextDate = moment(nextDate).add(1, "d");
  // nextDate = moment(nextDate).format("YYYY-MM-DD");
  // console.log('nextDate' + nextDate);

  // console.log(currentDate);
  // console.log(nextDate);

  let response = {};
  try {
    await Task.find({
      patientID: patientID
    })
      .then((task) => {
        response = { ...response, task: task };
        // console.log(response)
      })
      .catch((error) =>
        res.status(500).json({ error: "Internal server error" })
      );

    // console.log(response)
    const patient = await Patient.findById(patientID);
    if (patient) {
      response = { ...response, patient };
      // console.log(response)
      res.json({ task: response.task, patientData: patient });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/nurseTaskList", async (req, res) => {

  let currentDate = moment(new Date()).format("YYYY-MM-DD");
  currentDate = moment(currentDate).subtract(1, "day");
  currentDate = moment(currentDate).format("YYYY-MM-DD");
  console.log('Current Date :: '+ currentDate);


  let nextDate = moment(new Date()).format("YYYY-MM-DD");
  nextDate = moment(nextDate).add(1, "d");
  nextDate = moment(nextDate).format("YYYY-MM-DD");
  console.log('nextDate' + nextDate);

  const { userID } = req.body;

  await Task.aggregate([
    {
      $match: {"$and":[{
        primaryNurseID: new ObjectId(userID)},
        {inTakeTime: {
                $gte: new Date(currentDate),
                $lte: new Date(nextDate),
              }}
            ]
            }
    },
    {
      $lookup: {
        from: "patients",
        localField: "patientID",
        foreignField: "_id",
        as: "patientData",
      },
    },
  ])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

router.post("/updateTask", async (req, res) => {
  const { _id } = req.body;
  Task.updateOne(
    { _id: _id },
    {
      status: "Done",
    }
  )
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

module.exports = router;
