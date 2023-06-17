const nodemailer = require("nodemailer");
const Task = require("../models/task.model");
const moment = require('moment')

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

       const newDate=  moment().utcOffset("+05:30").format()
       console.log('Moment Date::::::' + newDate)
        const theDate = new Date(Date.parse(task.inTakeTime));
        const momentDate = moment(task.inTakeTime).format();
        console.log('Moment intake time ::::: ' + momentDate) 
        // console.log(theDate);
        // console.log(theDate.toLocaleString());
        console.log('Date Now :::::::::' +Date.now())
        // console.log(theDate < Date.now());

        console.log('the date :' + theDate);
        console.log('local string date :' + theDate.toLocaleString());
        console.log('compare date ' + theDate < Date.now());
        console.log('compare date ' + (theDate < newDate));

        consolr.log('compare new time :::::' + (momentDate < newDate))
        // console.log('Date Now :' + Date.now());
        return theDate < Date.now();
      });

      alertTasks.map(async (alertTask) => {
        await Task.updateOne(
          { _id: alertTask._id },
          {
            status: "On Alert",
          }
        );
        const patientName = alertTask.result[0].firstName
        const inTakeTime = alertTask.inTakeTime
        transporter.sendMail({
          from: "ayushmati.pesto@gmail.com",
          to: alertTask.result[0].emailID,
          subject: `ON Alert - Medicine Intake for ${patientName}`,
          text: `Please Complete the task of giving medicine to 
        ${patientName},
        Medicine Name : ${alertTask.medicineName},
        Medicine Type: ${alertTask.medicineType},
        In take time : ${inTakeTime}
        `,
        });
      });
    };

    taskFunction();
  }
}

module.exports = sendMail;
