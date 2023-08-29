const Pool = require("../config/db");

//GET ALL customers
const selectAllCustomers = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM customer ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

//GET SELECT customer
const selectCustomer = (customer_id) => {
  return Pool.query(`SELECT * FROM customer WHERE customer_id = '${customer_id}'`);
};

//DELETE SELECT customer
const deleteCustomer = (customer_id) => {
  return Pool.query(`DELETE FROM customer WHERE customer_id = '${customer_id}'`);
};

//POST customer
const createCustomer = (data) => {
  const {
    customer_id,
    customer_name,
    customer_email,
    customer_password,
    customer_confirmpasswordHash
  } = data;
  return Pool.query(`INSERT INTO customer(
    customer_id,
    customer_name,
    customer_email,
    customer_password,
    customer_confirmpassword
    ) 
    VALUES (
      '${customer_id}',
      '${customer_name}',
      '${customer_email}',
      '${customer_password}',
      '${customer_confirmpasswordHash}')`);
};

//PUT SELECT customer
const updateCustomer = (data) => {
  const { customer_id, customer_name, customer_email, customer_phone, customer_gender, customer_birth, customer_image } = data;
  return Pool.query(
    `UPDATE customer SET customer_name = '${customer_name}', customer_email = '${customer_email}', customer_phone = '${customer_phone}', customer_gender = '${customer_gender}', customer_birth = '${customer_birth}', customer_image = '${customer_image}' WHERE customer_id = '${customer_id}'`
  );
};

//FIND CUSTOMER
const findCustomerByID = (customer_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM customer WHERE customer_id = '${customer_id}' `,
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

const findUUID = (customer_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM customer WHERE customer_id = '${customer_id}' `,
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


const findCustomerByEmail = (customer_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM customer WHERE customer_email = '${customer_email}' `,
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
  return Pool.query(`SELECT COUNT(*) FROM customer`);
};

module.exports = {
  selectAllCustomers,
  selectCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
  findCustomerByID,
  findCustomerByEmail,
  findUUID,
  countData,
};
