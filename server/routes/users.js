// Created in Section 5, Lecture 81 - Create User Model
const express = require("express");
// Created in Section 6, Lecture 82 - User Controllers
const User = require("../controllers/user");

const router = express.Router();

// Note second argument, explained in Section 6, Lecture 82 - User Controllers
// Authenticate user in the database
router.post("/auth", User.auth);
// Register user in the database
router.post("/register", User.register);

module.exports = router;
