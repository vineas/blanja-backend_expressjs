const Pool = require("../config/db");

//GET ALL seller
const selectAllSeller = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

//GET SELECT seller
const selectSeller = (seller_id) => {
  return Pool.query(`SELECT * FROM seller WHERE seller_id = '${seller_id}'`);
};

//DELETE SELECT seller
const deleteSeller = (seller_id) => {
  return Pool.query(`DELETE FROM seller WHERE seller_id = '${seller_id}'`);
};

const findSellerByEmail = (seller_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE seller_email = '${seller_email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//POST seller
const createSeller = (data) => {
  const {
    seller_id,
    seller_name,
    seller_email,
    seller_phone,
    seller_storename,
    seller_password,
    seller_confirmpasswordHash
  } = data;
  return Pool.query(`INSERT INTO seller(
    seller_id,
    seller_name,
    seller_email,
    seller_phone,
    seller_storename,
    seller_password,
    seller_confirmpassword
    )
    VALUES (
      '${seller_id}',
      '${seller_name}',
      '${seller_email}',
      '${seller_phone}',
      '${seller_storename}',
    '${seller_password}',
    '${seller_confirmpasswordHash}')`);
};

//PUT SELECT seller
const updateSeller = (data) => {
  const {     
    seller_id,
    seller_email,
    seller_phone,
    seller_storename,
    seller_description,
    seller_image } = data;
  return Pool.query(
    `UPDATE seller SET seller_email = '${seller_email}', seller_phone = '${seller_phone}', seller_storename = '${seller_storename}', seller_description = '${seller_description}',seller_image = '${seller_image}' WHERE seller_id = '${seller_id}'`
  );
};

const updatePasswordSeller = (data) => {
  const { seller_id, seller_password, seller_confirmpasswordHash } =
    data;
  return Pool.query(
    `UPDATE seller SET seller_password = '${seller_password}', seller_confirmpassword = '${seller_confirmpasswordHash}'WHERE seller_id = '${seller_id}'`
  );
};

//FIND EMAIL
const findUUID = (seller_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE seller_id= '${seller_id}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const findEmail = (seller_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE seller_email= '${seller_email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//COUNT DATA
const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM seller`);
};

module.exports = {
  selectAllSeller,
  selectSeller,
  deleteSeller,
  createSeller,
  updateSeller,
  updatePasswordSeller,
  findUUID,
  findSellerByEmail,
  countData,
};