const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret="djfljfdljfljldjfdf"
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //hashing
    const salt= await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.status(201).json({ success: true }));
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({email});
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try login correct credentials" });
      }
      const pwdCompare=await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try login correct credentials" });
      }
      //payload
      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)
      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
