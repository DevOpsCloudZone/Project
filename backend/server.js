const express = require("express");
const cors = require("cors");

const travelRoutes = require("./routes/travelRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/travel", travelRoutes);

app.get("/", (req, res) => {
  res.send("UBoundFree Backend Running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));
