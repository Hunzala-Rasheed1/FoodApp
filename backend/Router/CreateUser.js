const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisHunzalaRasheed#ImStudent"
const bycrit = require("bcrypt");
router.post("/CreateUser", [
    body('Name').isLength({ min: 5 }),
    body('Password').isLength({ min: 5 }),
    body('Email').isEmail(),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let salt = await bycrit.genSalt(10);
    let scuPassword = await bycrit.hash(req.body.Password, salt);
    
    try {
        await User.create({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: scuPassword,
            Location: req.body.Location,

        });
        res.json({ success: true });
        console.log("Success");
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});


router.post("/LoginUser", [
    body('Email').isEmail(),
    body('Password').isLength({ min: 5 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   
    try {
        const { Email, Password } = req.body; // Destructure Email and Password from req.body
        let UserData = await User.findOne({ Email });
       
        if (!UserData) {
            return res.status(400).json({ errors: "User not found" }); 
        }
        
        const PasswordCompare = await bycrit.compare(Password, UserData.Password); // Compare Password with hashed password from database
        
        if (!PasswordCompare) {
            return res.status(400).json({ errors: "Enter correct password" }); // Corrected error message
        }

        const data ={
            user:{
                id:UserData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        res.json({ success: true,  authToken});

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ errors: "Internal server error" }); // Added error message for internal server error
    }
});


module.exports = router;
