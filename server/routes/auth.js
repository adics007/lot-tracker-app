const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "your-secret-key";

// Register
router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, hashedPassword, role],
    (err) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "User registered!" });
    });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) return res.status(401).json({ error: "User not found" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  });
});

module.exports = router;
