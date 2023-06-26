const express = require('express');
const router  = express.Router();
const userController = require('../controller/users');
const {protect} = require('../middleware/auth')

router
  .post("/register", userController.registerUser)
  .post("/login", userController.loginUser)
  .get("/profile", protect, userController.profile)
  .post("/refreshToken", userController.RefreshToken)

module.exports = router;