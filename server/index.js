const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
