const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const validate = require("../models/auth");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(401).send({ message: "Invalid Email Or Password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(401).send({ message: "Invalid Email Or Password" });
        }

        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully!" });

    } catch(error) {
        res.status(500).send({ message: "Internal server error" });
    }
})

module.exports = router;