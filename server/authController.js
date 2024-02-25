const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");


const generateAccessToken = (id) => {
    const payload = {
      id,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
  };

const authController = {
  async registration(req, res) {
    try {
      console.log(req.body);
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
  },

  async login(req, res) {
    try {
      console.log(req.body);

      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Incorrect password` });
      }

      const token = generateAccessToken(user._id)
      return res.json({token})
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  },

  async users(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = authController;
