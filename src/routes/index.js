const express = require("express");
const router = express.Router();
const productRouter = require('../routes/products')
const addressRouter = require('../routes/address')
const categoryRouter = require('../routes/category')
const paymentRouter = require('../routes/payment')
const customerRouter = require('../routes/customer')
const sellerRouter = require('../routes/seller')
const ordersRouter = require('../routes/orders')
const usersRouter = require('../routes/users')

router.use('/products', productRouter);
router.use('/address', addressRouter);
router.use('/category', categoryRouter);
router.use('/payment', paymentRouter);
router.use('/customer', customerRouter);
router.use('/seller', sellerRouter);
router.use('/orders', ordersRouter);
router.use('/users', usersRouter);

module.exports = router;