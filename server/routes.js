const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const controller = require("./authController");
const authMiddleware = require("./middleware/authMiddleware");

router.post(
  "/registration",
  [
    check("username", "User name can not be empty").notEmpty(),
    check(
      "password",
      "The password must be greater than 4 and less than 10"
    ).isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);

router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.users);

module.exports = router;
