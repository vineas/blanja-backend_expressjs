import express from "express";
import productRouter from "../routes/products.js";
// import addressRouter from "../routes/address.js";
// import categoryRouter from "../routes/category.js";
// import paymentRouter from "../routes/payment.js";
// import customerRouter from "../routes/customer.js";
// import sellerRouter from "../routes/seller.js";
// import ordersRouter from "../routes/orders.js";
// import usersRouter from "../routes/users.js";

const router = express.Router();

router.use("/products", productRouter);
// router.use("/address", addressRouter);
// router.use("/category", categoryRouter);
// router.use("/payment", paymentRouter);
// router.use("/customer", customerRouter);
// router.use("/seller", sellerRouter);
// router.use("/orders", ordersRouter);
// router.use("/users", usersRouter);

export default router;
