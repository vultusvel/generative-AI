const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const controller = require("./authController");
const roleMiddleware = require("./middlewaree/roleMiddleware");


router.post(
  "/registration",
  [
    check("username", "User name can not be empty").notEmpty(),
    check("password", "Password should be > than 4").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);

router.post("/login", controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);

module.exports = router;
