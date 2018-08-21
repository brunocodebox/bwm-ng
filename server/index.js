// Created in Section 4, Lecture 52 - Server initialisation
const express = require("express");
const mongoose = require("mongoose");

// Created in Section 4, Lecture 54 - Database introduction and creation
const config = require("./config/dev");

// Created in Section 4, Lecture 55 - Mongoose Rental Model
// Got removed somehow on start of new lesson. const Rental = require("./models/rental");
const FakeDb = require("./fake-db");

// Created in Section 4, Lecture 58 - Separate Routing
const rentalRoutes = require("./routes/rentals");

console.log(config.DB_URI);
mongoose.connect(config.DB_URI).then(() => {
  // Push all fake rentals to the database
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});

const app = express();
// Created in Section 4, Lecture 58 - Separate Routing
app.use("/api/v1/rentals", rentalRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(PORT);
  console.log("I am running");
});
