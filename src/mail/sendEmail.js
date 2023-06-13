const nodemailer = require("nodemailer");
const Task = require("../models/task.model");

// // Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayushmati.pesto@gmail.com",
    pass: "yrsozgccydceocai",
  },
});

async function sendMail() {
  const data = await Task.aggregate([
    {
      $match: { status: "Pending" },
    },
    {
      $lookup: {
        from: "users",
        localField: "primaryNurseID",
        foreignField: "_id",
        as: "result",
      },
    },
  ]);

  if (data) {
    const taskFunction = async () => {
      const alertTasks = data.filter((task) => {
        const theDate = new Date(Date.parse(task.inTakeTime));
        console.log(theDate);
        console.log(theDate.toLocaleString());
        console.log(theDate < Date.now());
        return theDate < Date.now();
      });

      alertTasks.map((alertTask) => {
        Task.updateOne(
          { _id: alertTask._id },
          {
            status: "On Alert",
          }
        );

        transporter.sendMail({
          from: "ayushmati.pesto@gmail.com",
          to: alertTask.result[0].emailID,
          subject: `ON Alert - Medicine Intake for ${alertTask.result[0].patientName}`,
          text: `Please Complete the task of giving medicine to 
        ${alertTask.result[0].patientName},
        Medicine Name : ${alertTask.medicineName},
        Medicine Type: ${alertTask.medicineType}
        `,
        });
      });
    };

    taskFunction();
  }
}

module.exports = sendMail;
