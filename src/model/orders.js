const Pool = require("../config/db");

const selectAllOrders = (sortby, sort) => {
  return Pool.query(`SELECT * FROM orders ORDER BY ${sortby} ${sort}`);
};

const selectOrders = (order_id) => {
  return Pool.query(
    `SELECT orders.*, product.product_name , customer.customer_name
    FROM orders join product ON orders.product_id = product.id
    JOIN customer ON orders.customer_id = customer.customer_id WHERE orders.order_id = '${order_id}'`
  );
};

const selectOrdersByCustomerId = (customer_id) => {
  return Pool.query(`SELECT orders.*, orders.product_id, payment.payment_name, product.product_name, product.product_image, product.product_price, customer.customer_name
  FROM orders
  LEFT JOIN payment ON orders.payment_id = payment.payment_id
  LEFT JOIN product ON orders.product_id = product.product_id
  LEFT JOIN customer ON orders.customer_id = customer.customer_id
  WHERE orders.customer_id = '${customer_id}';`);
};

const insertOrders = (data) => {
  const { 
    order_id,
    order_quantity,
    // total_price,
    // payment_id,
    // address_id,
    product_id,
    customer_id } = data;
  return Pool.query(`INSERT INTO orders(
    order_id,
    order_quantity,
    product_id,
    customer_id
    ) VALUES
    ('${order_id}',${order_quantity}, '${product_id}', '${customer_id}')`);
};

const updateOrders = (data) => {
  const { id, date, address_order, quantity, shipping, total_price, id_product, id_customer, } = data;
  return Pool.query(`UPDATE orders SET date ='${date}', address_order='${address_order}',quantity = ${quantity} ,shipping = '${shipping}', total_price = ${total_price}, id_product = ${id_product}, id_customer = ${id_customer} WHERE id=${id}`);
};

const deleteOrders = (order_id) => {
  return Pool.query(`DELETE FROM orders WHERE order_id='${order_id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
};

const findUUID = (order_id) => {
  return new Promise((resolve, reject) =>
      Pool.query(
          `SELECT orders FROM orders WHERE order_id='${order_id}'`,
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

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM orders WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllOrders,
  selectOrders,
  insertOrders,
  updateOrders,
  deleteOrders,
  countData,
  findId,
  findUUID,
  selectOrdersByCustomerId
};
