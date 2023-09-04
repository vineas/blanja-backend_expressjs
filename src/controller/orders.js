const { v4: uuidv4 } = require("uuid");
let {
  selectAllOrders,
  selectOrders,
  insertOrders,
  updateOrders,
  deleteOrders,
  countData,
  findUUID,
  findId,
  selectOrdersByCustomerId
} = require("../model/orders");
const commonHelper = require("../helper/common");

let ordersController = {
  getAllOrders: async (req, res) => {
    try {
      const sortby = req.query.sortby || "total_price";
      const sort = req.query.sort || "ASC";
      const result = await selectAllOrders(sortby, sort);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  getDetailOrders: async (req, res) => {
    const order_id = Number(req.params.id);
    const { rowCount } = await findUUID(order_id);
    if (!rowCount) {
      return res.json({ message: "ID is Not Found" });
    }
    selectOrders(order_id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },

  getOrderByCustomerId: (req, res, next) => {
    const customer_id = String(req.params.customer_id);
    selectOrdersByCustomerId(customer_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  createOrders: async (req, res) => {
    const {
      order_quantity,
      // total_price,
      product_id,
      customer_id
    } = req.body;
    // const {
    //   rows: [count],
    // } = await countData();
    const order_id = uuidv4();
    // const id = Number(count.count) + 1;
    const data = {
      order_id,
      order_quantity,
      // total_price,
      product_id,
      customer_id
    };
    insertOrders(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Order created")
      )
      .catch((err) => res.send(err));
  },


  updateOrders: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const {
        date,
        address_order,
        quantity,
        shipping,
        total_price,
        id_product,
        id_customer,
      } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        date,
        address_order,
        quantity,
        shipping,
        total_price,
        id_product,
        id_customer
      };
      updateOrders(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  
  deleteOrderById: async (req, res, next) => {
    try {
      const order_id = String(req.params.id);
      const { rowCount } = await findUUID(order_id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteOrders(order_id);
      commonHelper.response(res, {}, 200, "Order terhapus");
    } catch (error) {
      next(error);
    }
  },
  // getSearchProduct: async (req, res) => {
  //   try {
  //     const name = req.params.name;
  //     // const keyword =req.query.keyword; 
  //     // const search = req.query.search;
  //     const result = await findName(name);
  //     commonHelper.response(res, result.rows, 200, "get data success");
  //   } catch (error) {
  //     console.log(error);
  //   }    
  // }
};

module.exports = ordersController;
