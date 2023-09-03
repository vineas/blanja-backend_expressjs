const Pool = require('../config/db')

const selectAllAddress = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT * FROM address ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectAddress = (address_id) => {
  return Pool.query(`SELECT * FROM address WHERE address_id = '${address_id}'`)
}

const selectAddressByCustomerId = (customer_id) => {
  return Pool.query(`SELECT *FROM address LEFT JOIN customer ON address.customer_id = customer.customer_id WHERE address.customer_id='${customer_id}'`);
};

const insertAddress = (data) => {
  const { 
    address_id,
    address_as,
    recipient_name,
    recipient_phone,
    address_line,
    postal_code,
    city_or_subdistrict,
    customer_id } = data;
  return Pool.query(`INSERT INTO address(
    address_id,
    address_as,
    recipient_name,
    recipient_phone,
    address_line,
    postal_code,
    city_or_subdistrict,
    customer_id
    ) VALUES
    ('${address_id}','${address_as}','${recipient_name}','${recipient_phone}','${address_line}', '${postal_code}', '${city_or_subdistrict}', '${customer_id}')`);
}

const updateAddress = (data) => {
  const { 
    address_id,
    address_as,
    recipient_name,
    recipient_phone,
    address_line,
    postal_code,
    city_or_subdistrict,
    customer_id
} = data;
  return Pool.query(`UPDATE address SET address_as='${address_as}', recipient_name='${recipient_name}', recipient_phone='${recipient_phone}', address_line ='${address_line}', postal_code='${postal_code}', city_or_subdistrict='${city_or_subdistrict}', customer_id='${customer_id}' WHERE address_id='${address_id}'`);
}


const deleteAddress = (address_id) => {
  return Pool.query(`DELETE FROM address WHERE address_id='${address_id}'`);
}

const deleteAddressByCustomerId = (customer_id, address_id) => {
  return Pool.query(`DELETE FROM address WHERE address.customer_id='${customer_id}' AND address.address_id='${address_id}'`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM address')
}

const findUUID = (address_id) => {
  return new Promise((resolve, reject) =>
      Pool.query(
          `SELECT address FROM address WHERE address_id='${address_id}'`,
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

const findCustomerId = (customer_id) => {
  return new Promise((resolve, reject) =>
      Pool.query(
          `SELECT address FROM address WHERE customer_id='${customer_id}'`,
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

const searchAddress = (name) => {
  return Pool.query(`SELECT * FROM address WHERE name ILIKE '%${name}%'`)
}

module.exports = {
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
    searchAddress
}