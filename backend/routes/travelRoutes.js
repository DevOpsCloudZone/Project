const express = require("express");
const router = express.Router();

// Dummy travel data
const travelData = [
  {
    id: 1,
    name: "Manali",
    description: "Snow mountains and adventure sports",
    image: "https://via.placeholder.com/250"
  },
  {
    id: 2,
    name: "Goa",
    description: "Beaches, nightlife, and relaxation",
    image: "https://via.placeholder.com/250"
  }
];

// GET all trips
router.get("/", (req, res) => {
  res.json(travelData);
});

// GET single trip by ID
router.get("/:id", (req, res) => {
  const trip = travelData.find(t => t.id == req.params.id);
  res.json(trip);
});

module.exports = router;
