const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middleware/cloudinary");
let {
  selectAllCustomers,
  selectCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  updatePasswordCustomer,
  findUUID,
  findCustomerByEmail,
  countData,
} = require("../model/customer");

let customerController = {
  getAllCustomer: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "customer_id";
      const sort = req.query.sort || "ASC";
      let result = await selectAllCustomers({ limit, offset, sort, sortby });
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
        "Get Customer Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getSelectCustomer: async (req, res) => {
    const customer_id = String(req.params.id);
    const { rowCount } = await findUUID(customer_id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectCustomer(customer_id)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Customer Detail Success"
        );
      })
      .catch((err) => res.send(err));
  },

  registerCustomer: async (req, res) => {
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_password,
      customer_confirmpassword,
    } = req.body;
    const { rowCount } = await findCustomerByEmail(customer_email);
    if (rowCount) {
      return res.json({ message: "Email Already Taken" });
    }

    const customer_id = uuidv4();

    const schema = Joi.object().keys({
      customer_email: Joi.required(),
      customer_name: Joi.string().required(),
      customer_phone: Joi.string().min(10).max(12),
      customer_password: Joi.string().min(3).max(15).required(),
      customer_confirmpassword: Joi.ref("customer_password"),
    });

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      return res.send(error.details);
    }

    const customer_confirmpasswordHash = bcrypt.hashSync(customer_confirmpassword);

    const data = {
      customer_id,
      customer_name,
      customer_email,
      customer_phone,
      customer_confirmpasswordHash,
    };

    createCustomer(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Create User Success")
      )
      .catch((err) => res.send(err));
  },

  editCustomer: async (req, res) => {
    try {
      const {
        customer_name,
        customer_email,
        customer_phone,
        customer_gender,
        customer_birth
      } = req.body;
      const customer_id = String(req.params.id);
      const { rowCount } = await findUUID(customer_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        customer_image: Joi.any(),
        customer_name: Joi.string().required(),
        customer_email: Joi.string().required(),
        customer_phone: Joi.string().min(10).max(12),
        customer_gender: Joi.string().required(),
        customer_birth: Joi.string().required()
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details);
      }
      let customer_image = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        customer_image = result.secure_url;
      }
      const data = {
        customer_id,
        customer_image,
        customer_name,
        customer_email,
        customer_phone,
        customer_gender,
        customer_birth
      };

      updateCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Customer Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  updatePasswordCustomer: async (req, res) => {
    try {
      const { pekerja_password, pekerja_confirmpassword } = req.body;
      const pekerja_id = String(req.params.id);
      const { rowCount } = await findUUID(pekerja_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        pekerja_password: Joi.string().min(3).max(15),
        pekerja_confirmpassword: Joi.ref("pekerja_password"),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details);
      }
      let customer_image = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        customer_image = result.secure_url;
      }
      const pekerja_confirmpasswordHash = bcrypt.hashSync(pekerja_confirmpassword);
      const data = {
        pekerja_id,
        pekerja_confirmpasswordHash,
      };

      updatePasswordCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update pekerja Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const customer_id = String(req.params.id);
      const { rowCount } = await findUUID(customer_id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteCustomer(customer_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete pekerja Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  loginCustomer: async (req, res) => {
    const { customer_email, customer_confirmpassword } = req.body;
    const {
      rows: [customer],
    } = await findCustomerByEmail(customer_email);
    if (!customer) {
      return res.json({ message: "Email Wrong" });
    }
    const isValidPassword = bcrypt.compareSync(
      customer_confirmpassword,
      customer.customer_confirmpassword
    );
    if (!isValidPassword) {
      return res.json({ message: "Password Wrong" });
    }
    delete customer.customer_confirmpassword;
    const payload = {
      customer_email: customer.customer_email,
    };
    customer.token_user = authHelper.generateToken(payload);
    customer.refreshToken = authHelper.refreshToken(payload);
    commonHelper.response(res, customer, 201, "Login Successfully");
},

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      pekerja_email: decoded.pekerja_email,
    };
    const result = {
      token_user: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = customerController;