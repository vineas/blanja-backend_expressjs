const express = require('express');
const router  = express.Router();
const ordersController = require('../controller/orders');

router
  .get("/", ordersController.getAllOrders)
  .get("/:id", ordersController.getDetailOrders)
  .get("/customer/:customer_id", ordersController.getOrderByCustomerId)
  .post("/", ordersController.createOrders)
  .put("/:id", ordersController.updateOrders)
  .delete("/:id", ordersController.deleteOrderById)

module.exports = router;