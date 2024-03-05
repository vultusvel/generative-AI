const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Registration error", errors });
    }
    const { username, password } = req.body;
    const candidate = await User.findOne({ username });
    if (candidate) {
      return res
        .status(400)
        .json({ message: "A user with this name already exists" });
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ username, password: hashPassword });
    await user.save();
    return res.json({ message: "User successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration error" });
  }
};

module.exports = registration;