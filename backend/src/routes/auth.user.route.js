const express = require("express");
const User = require("../model/user.model.js");

const router = express.Router();
const generateToken = require("../middleware/generateToken.js");

//register a new User
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, password, username });
    // console.log(user)
    await user.save();
    res
      .status(200)
      .send({ message: "User Registration Successfully!", user: user });
  } catch (error) {
    console.error("Failed TO Register", error);
    res.status(500).json({ message: "Registration Failed" });
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User Not Found!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // generate token here
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, // enable this when you have https://
      secure: true,
      sameSite: true,
    });

    console.log("Generated Token :", token);
    res.status(200).send({
      message: "Login Successfully!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Failed To Login", error);
    res.status(500).json({ message: "Failed To Login! Try Again" });
  }
});

// Logout User
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send({message: "Logged out successfully done!"})
  } catch (error) {
    console.error("Failed To Logout", error);
    res.status(500).send({ message: "Failed To Logout!" });
  }
});

// get User


module.exports = router;
