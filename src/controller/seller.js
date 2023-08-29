const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middleware/cloudinary");
let {
    selectAllSeller,
    selectSeller,
    deleteSeller,
    createSeller,
    updateSeller,
    updatePasswordSeller,
    findUUID,
    findSellerByEmail,
    countData,
} = require("../model/seller");

let sellerController = {
    getAllSeller: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 100;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "seller_id";
            const sort = req.query.sort || "ASC";
            let result = await selectAllSeller({ limit, offset, sort, sortby });
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
                "Get Seller Data Success",
                pagination
            );
        } catch (err) {
            console.log(err);
        }
    },

    getSelectSeller: async (req, res) => {
        const seller_id = String(req.params.id);
        const { rowCount } = await findUUID(seller_id);
        if (!rowCount) {
            return res.json({ message: "ID Not Found" });
        }
        selectSeller(seller_id)
            .then((result) => {
                commonHelper.response(
                    res,
                    result.rows,
                    200,
                    "Get Seller Detail Success"
                );
            })
            .catch((err) => res.send(err));
    },

    registerSeller: async (req, res) => {
        const {
            seller_name,
            seller_email,
            seller_phone,
            seller_storename,
            seller_password,
            seller_confirmpassword,
        } = req.body;
        const { rowCount } = await findSellerByEmail(seller_email);
        if (rowCount) {
            return res.json({ message: "Email Already Taken" });
        }

        const seller_id = uuidv4();

        const schema = Joi.object().keys({
            seller_email: Joi.required(),
            seller_name: Joi.string().required(),
            seller_storename: Joi.string().required(),
            seller_phone: Joi.string().min(10).max(12),
            seller_password: Joi.string().min(3).max(15).required(),
            seller_confirmpassword: Joi.ref("seller_password"),
        });

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            console.log(error);
            return res.send(error.details);
        }

        const seller_confirmpasswordHash = bcrypt.hashSync(seller_confirmpassword);

        const data = {
            seller_id,
            seller_name,
            seller_email,
            seller_storename,
            seller_phone,
            seller_confirmpasswordHash
        };

        createSeller(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Create User Success")
            )
            .catch((err) => res.send(err));
    },

    editSeller: async (req, res) => {
        try {
            const {
                seller_storename,
                seller_email,
                seller_phone,
                seller_description,
            } = req.body;
            const seller_id = String(req.params.id);
            const { rowCount } = await findUUID(seller_id);
            if (!rowCount) {
                res.json({ message: "ID Not Found" });
            }
            const schema = Joi.object().keys({
                seller_image: Joi.any(),
                seller_storename: Joi.string().required(),
                seller_email: Joi.string().required(),
                seller_phone: Joi.string().min(10).max(12),
                seller_storename: Joi.string().required()

            });
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                console.log(error);
                return res.send(error.details);
            }
            let seller_image = null;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                seller_image = result.secure_url;
            }
            const data = {
                seller_image,
                seller_storename,
                seller_email,
                seller_phone,
                seller_description
            };

            updateSeller(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Update Sellers Success")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    updatePasswordSeller: async (req, res) => {
        try {
            const { seller_password, seller_confirmpassword } = req.body;
            const seller_id = String(req.params.id);
            const { rowCount } = await findUUID(seller_id);
            if (!rowCount) {
                res.json({ message: "ID Not Found" });
            }
            const schema = Joi.object().keys({
                seller_password: Joi.string().min(3).max(15),
                seller_confirmpassword: Joi.ref("seller_password"),
            });
            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                console.log(error);
                return res.send(error.details);
            }
            let seller_image = null;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                seller_image = result.secure_url;
            }
            const seller_confirmpasswordHash = bcrypt.hashSync(seller_confirmpassword);
            const data = {
                seller_id,
                seller_confirmpasswordHash,
            };

            updatePasswordSeller(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Update Seller Success")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    deleteSeller: async (req, res) => {
        try {
            const seller_id = String(req.params.id);
            const { rowCount } = await findUUID(seller_id);
            if (!rowCount) {
                res.json({ message: "ID Not Found" });
            }
            deleteSeller(seller_id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Delete Seller Success")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    loginSeller: async (req, res) => {
        const { seller_email, seller_confirmpassword } = req.body;
        const {
            rows: [seller],
        } = await findSellerByEmail(seller_email);
        if (!seller) {
            return res.json({ message: "Email Wrong" });
        }
        const isValidPassword = bcrypt.compareSync(
            seller_confirmpassword,
            seller.seller_confirmpassword
        );
        if (!isValidPassword) {
            return res.json({ message: "Password Wrong" });
        }
        delete seller.seller_confirmpassword;
        const payload = {
            seller_email: seller.seller_email,
        };
        seller.token_user = authHelper.generateToken(payload);
        seller.refreshToken = authHelper.refreshToken(payload);
        commonHelper.response(res, seller, 201, "Login Successfully");
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

module.exports = sellerController;