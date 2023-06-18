const express = require("express");
const router = express.Router();
const productRouter = require('../routes/products')
const categoryRouter = require('../routes/category')
const customerRouter = require('../routes/customer')
const ordersRouter = require('../routes/orders')

router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/customer', customerRouter);
router.use('/orders', ordersRouter);

module.exports = router;