const express = require("express");
const cors = require("cors");

const travelRoutes = require("./routes/travelRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Route connection
app.use("/api/travel", travelRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("UBoundFree Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
