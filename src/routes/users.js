const express = require("express");
const router = express.router();
const userController = require("../controllers/userController.js");

// POST /users/register
router.post("/register", userController.register);

// POST /users/login
router.post("/login", userController.login);

module.exports = router;
