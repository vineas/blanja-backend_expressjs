let {
    selectAllAddress,
    selectAddress,
    selectAddressByCustomerId,
    insertAddress,
    updateAddress,
    deleteAddress,
    deleteAddressByCustomerId,
    countData,
    findUUID,
    findCustomerId,
    searchProduct,
  } = require("../model/address");
  const { v4: uuidv4 } = require("uuid");
  const createError = require("http-errors");
  const commonHelper = require("../helper/common");
  const cloudinary = require('../middleware/cloudinary');
  // const client = require("../config/redis");
  
  let addressController = {
    getAllAddress: async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const sortby = req.query.sortby || 'address_id';
        const sort = req.query.sort || "DESC";
        let result = await selectAllAddress({ limit, offset, sortby, sort });
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
  
    getSearchAddress: async (req, res) => {
      try {
        const searchBy = req.query.keyword;
        const result = await searchProduct(searchBy);
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
  
    getDetailAddress: async (req, res) => {
      const address_id = String(req.params.id);
      selectAddress(address_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "get data success")
        )
        .catch((err) => res.send(err));
    },
  
    getAddressByCustomerId: (req, res, next) => {
      const customer_id = String(req.params.customer_id);
      selectAddressByCustomerId(customer_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "get data success")
        )
        .catch((err) => res.send(err));
    },
  
    createAddress: async (req, res) => {
      const PORT = process.env.PORT || 4000
      const DB_HOST = process.env.DB_HOST || 'localhost'
      const {     
        address_as,
        recipient_name,
        recipient_phone,
        address_line,
        postal_code,
        city_or_subdistrict,
        customer_id } =
        req.body;
      const {
        rows: [count],
      } = await countData();
      // const id = Number(count.count) + 1;
      const address_id = uuidv4();
      const data = {
        address_id,
        address_as,
        recipient_name,
        recipient_phone,
        address_line,
        postal_code,
        city_or_subdistrict,
        customer_id 
      };
      console.log(data);
      insertAddress(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Create Address Success")
        )
        .catch((err) => res.send(err));
    },
  
  
    updateAddress: async (req, res) => {
      try {
        const PORT = process.env.PORT || 4000;
        const DB_HOST = process.env.DB_HOST || "localhost";
        const { 
            address_as,
            recipient_name,
            recipient_phone,
            address_line,
            postal_code,
            city_or_subdistrict,
            customer_id 
        } =
          req.body;
        // const { rowCount } = await findId(id);
        const address_id = String(req.params.id);
        const { rowCount } = await findUUID(address_id);
        if (!rowCount) {
          return next(createError(403, "ID is Not Found"));
        }
        const data = {
          address_id,
          address_as,
          recipient_name,
          recipient_phone,
          address_line,
          postal_code,
          city_or_subdistrict,
          customer_id 
        };
        console.log(data);
        updateAddress(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Address updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  
    deleteAddressByCustomerId: async (req, res, next) => {
      try {
        const customer_id = String(req.params.customer_id);
        const address_id = String(req.params.address_id);
        await deleteAddressByCustomerId(customer_id, address_id);
        commonHelper.response(res, {}, 200, "Address terhapus");
      } catch (error) {
        next(error);
      }
    },
  
  
    deleteAddress: async (req, res, next) => {
      try {
        const address_id = String(req.params.id);
        const { rowCount } = await findUUID(address_id);
        if (!rowCount) {
          return next(createError(403, "ID is Not Found"));
        }
        await deleteAddress(address_id);
        commonHelper.response(res, {}, 200, "Address terhapus");
      } catch (error) {
        next(error);
      }
    },
  };
  
  module.exports = addressController;  