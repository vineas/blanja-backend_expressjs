const express = require("express");
const router = express.Router();
const uploadCustomer = require("../middleware/uploadCustomer");
const customerController = require("../controller/customer");
router
  .post("/register", uploadCustomer, customerController.registerCustomer)
  .post("/login", customerController.loginCustomer)
  .get("/profile/:id", customerController.getSelectCustomer)
  .get("/profile", customerController.getAllCustomer)
  .put("/profile/:id", uploadCustomer, customerController.editCustomer)
  .put("/password/:id", uploadCustomer, customerController.updatePasswordCustomer)
  .delete("/profile/:id", customerController.deleteCustomer);
module.exports = router;
  