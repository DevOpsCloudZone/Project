const express = require("express");
const router = express.Router();

let wishlist = [];

// Add to wishlist
router.post("/", (req, res) => {
  wishlist.push(req.body);
  res.json({ message: "Added to wishlist" });
});

// Get wishlist
router.get("/", (req, res) => {
  res.json(wishlist);
});

module.exports = router;
