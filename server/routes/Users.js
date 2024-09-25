const express = require('express');
const router = express.Router();
const { Users }= require('../models');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({ username: username, password: hash,});
        return res.json("User created successfully");
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) return res.status(404).json("User Doesn't Exist");
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.status(401).json("Wrong Username and Password Combination");
        else {return res.json("Login successful")};
    });
});

module.exports = router; 