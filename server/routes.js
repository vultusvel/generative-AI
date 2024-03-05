const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const controllers = require("./controllers");

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
  controllers.registration
);

router.post("/login", controllers.login);
router.post("/collections", authMiddleware, controllers.collections);
module.exports = router;
