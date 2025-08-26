import {
  selectAllProduct,
  selectProduct,
  selectProductBySellerId,
  insertProduct,
  updateProduct,
  deleteProduct,
  deleteProductBySellerId,
  countData,
  findUUID,
  // findSellerId,
  searchProduct,
} from "../model/products.js";

import { v4 as uuidv4 } from "uuid";
import createError from "http-errors";
import * as commonHelper from "../helper/common.js";
import cloudinary from "../middleware/cloudinary.js";

// const client = require("../config/redis");

let productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "product_id";
      const sort = req.query.sort || "DESC";
      let result = await selectAllProduct({ limit, offset, sortby, sort });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getSearchProduct: async (req, res) => {
    try {
      const searchBy = req.query.keyword;
      const result = await searchProduct(searchBy);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  getDetailProduct: async (req, res) => {
    const product_id = String(req.params.id);
    selectProduct(product_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  getProductBySellerId: (req, res) => {
    const seller_id = String(req.params.seller_id);
    selectProductBySellerId(seller_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  createProduct: async (req, res) => {
    const PORT = process.env.PORT || 4000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    let product_image = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product_image = result.secure_url;
    }
    const {
      product_name,
      product_price,
      product_stock,
      description_product,
      category_id,
      seller_id,
    } = req.body;
    const {
      rows: [count],
    } = await countData();
    // const id = Number(count.count) + 1;
    const product_id = uuidv4();
    const data = {
      product_id,
      product_name,
      product_price,
      product_stock,
      product_image,
      description_product,
      category_id,
      seller_id,
    };
    console.log(data);
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create Product Success")
      )
      .catch((err) => res.send(err));
  },

  updateProduct: async (req, res, next) => {
    try {
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      // const id = Number(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const product_image = result.secure_url;
      const {
        product_name,
        product_price,
        product_stock,
        description_product,
        category_id,
      } = req.body;
      // const { rowCount } = await findId(id);
      const product_id = String(req.params.id);
      const { rowCount } = await findUUID(product_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        product_id,
        product_name,
        product_price,
        product_stock,
        product_image,
        description_product,
        category_id,
      };
      console.log(data);
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.error(error);
      next(createError(500, "Internal Server Error"));
    }
  },

  deleteProductBySellerId: async (req, res, next) => {
    try {
      const seller_id = String(req.params.seller_id);
      const product_id = String(req.params.product_id);
      await deleteProductBySellerId(seller_id, product_id);
      commonHelper.response(res, {}, 200, "Product terhapus");
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const product_id = String(req.params.id);
      const { rowCount } = await findUUID(product_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteProduct(product_id);
      commonHelper.response(res, {}, 200, "Product terhapus");
    } catch (error) {
      next(error);
    }
  },
};

export default productController;
