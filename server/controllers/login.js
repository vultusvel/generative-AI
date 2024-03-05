const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


const generateAccessToken = (id) => {
    const payload = {
      id,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
  };

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: `User ${username} not found` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Incorrect password` });
    }
    const id = user._id;
    const token = generateAccessToken(user._id);
    return res.json({ token, id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Login error" });
  }
};
module.exports = login;
