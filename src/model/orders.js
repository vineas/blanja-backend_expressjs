const Pool = require("../config/db");

const selectAllOrders = (sortby, sort) => {
  return Pool.query(`SELECT * FROM orders ORDER BY ${sortby} ${sort}`);
};

const selectOrders = (id) => {
  return Pool.query(
    `SELECT orders.*, product.name AS nama_product, users.fullname AS pembeli 
    FROM orders join product ON orders.id_product = product.id
    JOIN users ON orders.id_users = users.id WHERE orders.id = ${id}`
  );
};

// const selectOrders = (id) => {
//     return Pool.query(`SELECT * FROM orders WHERE id = ${id}`)
// }

const insertOrders = (data) => {
  const { id, address_order, quantity, shipping, total_price, id_product, id_users} = data;
  return Pool.query(`INSERT INTO orders(id,
        address_order ,
        quantity ,
        shipping ,
        total_price,
        id_product,
        id_users) VALUES
    (${id}, '${address_order}', ${quantity}, '${shipping}', ${total_price}, ${id_product}, '${id_users}')`);
};

const updateOrders = (data) => {
  const {id, date , address_order, quantity, shipping, total_price,id_product,id_customer,} = data;
  return Pool.query(`UPDATE orders SET date ='${date}', address_order='${address_order}',quantity = ${quantity} ,shipping = '${shipping}', total_price = ${total_price}, id_product = ${id_product}, id_customer = ${id_customer} WHERE id=${id}`);
};

const deleteOrders = (id) => {
  return Pool.query(`DELETE FROM orders WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
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
};
