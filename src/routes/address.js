// const express = require('express');
// const router = express.Router();
// const addressController = require('../controller/address');
// const {protect, validateRole} = require('../middleware/auth')
// const upload = require('../middleware/upload')
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

// router
//   .get("/", addressController.getAllAddress)
//   .get("/search", addressController.getSearchAddress)
//   .get("/:id", addressController.getDetailAddress)
//   .get("/profile/:customer_id", addressController.getAddressByCustomerId)
//   .post("/",  upload, addressController.createAddress)
//   .put("/:id",  upload, addressController.updateAddress)
//   .delete("/:id",  addressController.deleteAddress)
//   .delete("/profile/:customer_id/:id",  addressController.deleteAddressByCustomerId);
// // protect, validateRole, clearCacheProductDetail,

// module.exports = router;