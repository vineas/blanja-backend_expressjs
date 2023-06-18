const express = require('express');
const router  = express.Router();
const customerController = require('../controller/customer');

router
  .get("/", customerController.getAllCustomer)
  .get("/:id", customerController.getDetailCustomer)
  .post("/", customerController.createCustomer)
  .put("/:id", customerController.updateCustomer)
  .delete("/:id", customerController.deleteCustomer)

module.exports = router;