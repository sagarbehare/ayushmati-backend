const express = require("express");
const Task = require("../models/task.model");
const Patient = require("../models/patient.model");
const { ObjectId } = require("bson");
const router = express.Router();

router.post("/createPatientTask", async (req, res) => {
  const { newTask } = req.body;
  console.log(newTask);
  console.log(newTask.inTakeTime);
  console.log(newTask.primaryNurse)
  const patientID = newTask.patientID;
  const primaryNurseID = newTask.primaryNurseID
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
    status
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

    const currentDate = new Date();

    const startDate = new Date(currentDate);
startDate.setHours(0, 0, 0, 0);

const endDate = new Date(currentDate);
endDate.setHours(23, 59, 59, 999);


   await Task.find({ patientID: patientID,
     inTakeTime: { $gte: startDate, $lt: endDate } ,
     inTakeTime: {
      "$gte": new Date("2023-06-15"), "$lt": new Date("2023-06-15")
    }})
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


router.post("/nurseTaskList", async(req,res)=>{
  const {userID} = req.body
    await Task.aggregate([
      {
        $match:{primaryNurseID:new ObjectId(userID)}
      },
    {"$lookup":{
      "from":"patients",
      localField:"patientID",
      foreignField:"_id",
      as:"patientData"
    }}
   ])
   .then((data)=>{
    res.status(200).json(data)
   })
   .catch((error) =>
   res.status(500).json({ error: "Internal server error" })
 );
})

router.post("/updateTask", async(req,res)=>{
  const { _id} = req.body
  Task.updateOne({_id:_id},{
    status : "Done"
  })
  .then((data)=>{
    res.status(201).json(data)
  })
  .catch((error) =>
    res.status(500).json({ error: "Internal server error" })
  );
})

module.exports = router;
