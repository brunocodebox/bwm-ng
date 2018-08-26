// Created in Section 4, Lecture 52 - Server initialisation
const express = require("express");
const mongoose = require("mongoose");
// Created in Section 6, Lecture 82 - User Controllers
const bodyParser = require("body-parser");
// Created in Section 4, Lecture 54 - Database introduction and creation
const config = require("./config/dev");

// Created in Section 4, Lecture 55 - Mongoose Rental Model
// Got removed somehow on start of new lesson. const Rental = require("./models/rental");
const FakeDb = require("./fake-db");

// Created in Section 4, Lecture 58 - Separate Routing
const rentalRoutes = require("./routes/rentals");

// Created in Section 6, Lecture 81 - Create User Model
const userRoutes = require("./routes/users");

console.log(config.DB_URI);
mongoose.connect(config.DB_URI).then(() => {
  // Push all fake rentals to the database
  const fakeDb = new FakeDb();
  fakeDb.seedDb(); // commented out in Section 6, Lecture 83
});

const app = express();

// Created in Section 6, Lecture 82 - User Controllers
app.use(bodyParser.json()); // middleware to parse json from the request

// Created in Section 4, Lecture 58 - Separate Routing
app.use("/api/v1/rentals", rentalRoutes);

// Created in Section 6, Lecture 81 - Create User Model
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(PORT);
  console.log("I am running");
});
