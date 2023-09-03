const express = require('express');
const router = express.Router();
const productController = require('../controller/products');
const {protect, validateRole} = require('../middleware/auth')
const upload = require('../middleware/upload')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router
  .get("/", productController.getAllProduct)
  .get("/profile/:seller_id", productController.getProductBySellerId)
  .get("/search", productController.getSearchProduct)
  .get("/:id", productController.getDetailProduct)
  .post("/",  upload, productController.createProduct)
  .put("/:id",  upload, productController.updateProduct)
  .delete("/:id",  productController.deleteProduct);
// protect, validateRole, clearCacheProductDetail,

module.exports = router;