const express = require('express');
const router = express.Router();

const signupController = require("../controller/Signup");
const db = require("../model");

// router.post("/", (req, res) => { signupController.assignmentCreation(req, res, db) });

// module.exports = router;

// Handle signup form submission
router.post('/', (req, res) => {
    console.log("inside routes");
    signupController.userCreation(req, res, db);
});

module.exports = router;
