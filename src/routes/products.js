const express = require('express');
const router  = express.Router();
const productController = require('../controller/products');
const {protect, validateRole} = require('../middleware/auth')
const upload = require('../middleware/upload')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router
  .get("/", protect, productController.getAllProduct)
  .get("/search", productController.getSearchProduct)
  .get("/:id", hitCacheProductDetail, productController.getDetailProduct)
  .post("/",  protect, validateRole,clearCacheProductDetail, upload.single('image'), productController.createProduct)
  .put("/:id", protect, validateRole, clearCacheProductDetail, upload.single('image'), productController.updateProduct)
  .delete("/:id", protect, validateRole, clearCacheProductDetail, productController.deleteProduct);   

module.exports = router;