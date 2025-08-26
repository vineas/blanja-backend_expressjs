import express from "express";
import productController from "../controller/products.js";
// import { protect, validateRole } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
// import { hitCacheProductDetail, clearCacheProductDetail } from "../middleware/redis.js";

const router = express.Router();

router
  .get("/", productController.getAllProduct)
  .get("/profile/:seller_id", productController.getProductBySellerId)
  .get("/search", productController.getSearchProduct)
  .get("/:id", productController.getDetailProduct)
  .post("/", upload, productController.createProduct)
  .put("/:id", upload, productController.updateProduct)
  .delete("/:id", productController.deleteProduct);
// protect, validateRole, clearCacheProductDetail,

export default router;
