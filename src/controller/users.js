const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { selectAllUsers, findEmail, create } = require("../model/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

let userController = {

  getAllUser: async (req, res) => {
    try {
      const result = await selectAllUsers();
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (req, res) => {
    let { fullname, email, password, role } = req.body;
    const { rowCount } = await findEmail(email);
    if (rowCount) {
      return res.json({ message: "Email is Already Taken" });
    }
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    const data = {
      id,
      email,
      passwordHash,
      fullname,
      role,
    };
    create(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, "email is created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    console.log(user);
    if (!user) {
      return res.json({ message: "Email is incorrect" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Password is incorrect" });
    }
    delete user.password;
    const payload = {
      email: user.email,
      role: user.role,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refreshToken(payload)
    commonHelper.response(res, user, 201, "login is successful");
  },
  profile: async (req, res) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },

  RefreshToken: (req, res) => {
    const refreshToken = req.body.RefreshToken
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
    const payload ={
      email : decoded.email,
      role : decoded.role
    }
    const result ={
      token : authHelper.generateToken(payload),
      refreshToken : authHelper.refreshToken(payload)
    }
    commonHelper.response(res, result, 200, "Token is Already generate");

  
  }
};

module.exports = userController;
