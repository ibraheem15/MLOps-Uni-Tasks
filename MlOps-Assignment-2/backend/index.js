const express = require("express");
// mongo
const mongoose = require("mongoose");
const User = require("./models/User");
// env
require("dotenv").config();

// jwt
const jwt = require("jsonwebtoken");

//cors
const cors = require("cors");

//cookie-parser
const cookieParser = require("cookie-parser");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to MongoDB"));

// Create the Express app

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  cookieParser({
    secret: process.env.JWT_SECRET,
    sameSite: "none",
    secure: true,
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  // check if password matches
  if (user.password !== password) {
    return res.status(400).send("Invalid password");
  }

  // create a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // send the token
  res.status(200).send(token);
});

app.post("/signup", async (req, res) => {
  // get email and password
  const { email, password } = req.body;

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // create a new user
  const user = new User({ email, password });

  // save the user
  await user.save();

  // send with 200 status
  res.status(200).send("User created");
});

app.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  // send with 200 status
  res.status(200).send("Email sent");
});

app.post("/change-password", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  // update the password
  user.password = password;
  await user.save();

  // send with 200 status
  res.status(200).send("Password changed");
});

app.get("/check-token", async (req, res) => {
  //Authorization: Bearer token
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  // check if token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send(payload);
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
