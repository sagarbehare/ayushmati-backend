const express = require("express");
const Ward = require("../models/ward.model");

const router = express.Router();

// Routes // route.js
// Routes // route.js

router.get("/listWardByHospital/:hospitalName", async (req, res) => {
  const hospitalName = req.params.hospitalName;

  console.log("hospitalName ::: " + hospitalName);

  Ward.find({ hospitalName: hospitalName })

    .then((wards) => res.json(wards))

    .catch((error) => res.status(500).json({ error: "Internal server error" }));
});

router.get(
  "/listRoomByHospitalNWard/:hospitalName/:wardName",
  async (req, res) => {
    const hospitalName = req.params.hospitalName;

    const wardName = req.params.wardName;

    console.log("hospitalName ::: " + hospitalName);

    Ward.find({ hospitalName: hospitalName, wardName: wardName })
      .select("rooms.roomNo")

      .then((wards) => res.json(wards))

      .catch((error) =>
        res.status(500).json({ error: "Internal server error" })
      );
  }
);

router.get(
  "/listBedByHospitalNWardNRoom/:hospitalName/:wardName/:roomNo",
  async (req, res) => {
    const hospitalName = req.params.hospitalName;

    const wardName = req.params.wardName;

    const roomNo = req.params.roomNo;

    Ward.find(
      {
        hospitalName: hospitalName,
        wardName: wardName,
        rooms: { $elemMatch: { roomNo: roomNo } },
      }

      //    {'rooms.$': 1, 'rooms.beds.bedNo': 1 } // Projection to only retrieve the matched room object
    )
      .select("rooms.roomNo rooms.beds.bedNo")

      .then((wards) => res.json(wards))

      .catch((error) =>
        res.status(500).json({ error: "Internal server error" })
      );
  }
);

// router.get('/listWardByHospital/:hospitalName', async (req, res) => {
//   const hospitalName = req.params.hospitalName;

//   console.log('hospitalName ::: ' + hospitalName);

//   Ward.find({ hospitalName: hospitalName})
//       .then((wards) => res.json(wards))
//     .catch((error) => res.status(500).json({ error: 'Internal server error' }));
// });

module.exports = router;
