const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all travel data
router.get("/", (req, res) => {
  db.query("SELECT * FROM travel", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET single travel by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM travel WHERE id=?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

module.exports = router;
