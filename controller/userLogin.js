const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please provide a password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("check password", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_KEY, {
        expiresIn: "8h",
      });
      const tokenOption = {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "None",
        maxAge: 8 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
      };
      res
        .cookie("token", token, tokenOption)
        .json({
          message: "Login Successfully",
          data: { token },
          success: true,
          error: false,
        });
    } else {
      return res.status(401).json({ message: "Check you password" });
    }
  } catch (error) {
    res.json({ message: error.message, error: true, success: false });
  }
};

module.exports = userLogin;
