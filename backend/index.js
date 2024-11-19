const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load or initialize users database
const DB_PATH = "./users.json";
let users = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH)) : [];

// Login endpoint
app.post("/login", (req, res) => {
  const { email, name, picture } = req.body;

  // Check if user exists
  const user = users.find((u) => u.email === email);
  if (user) {
    return res.status(200).json({ user, registered: true });
  }

  // Add new user
  const newUser = { email, name, picture };
  users.push(newUser);
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  res.status(200).json({ user: newUser, registered: false });
});

// Register additional details
app.post("/register", (req, res) => {
  const { email, website, contactNumber } = req.body;

  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], website, contactNumber };
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  res
    .status(200)
    .json({ message: "Registration completed", user: users[userIndex] });
});

// Fetch user details
app.get("/user/:email", (req, res) => {
  const { email } = req.params;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
