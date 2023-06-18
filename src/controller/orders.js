let {
    selectAllOrders,
    selectOrders,
    insertOrders,
    updateOrders,
    deleteOrders,
    countData,
    findId
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
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }
      selectOrders(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
  
    createOrders: async (req, res) => {
      const {
        date,
        address_order,
        quantity,
        shipping,
        total_price,
        id_product,
        id_customer,
      } = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        date,
        address_order,
        quantity,
        shipping,
        total_price,
        id_product,
        id_customer,
      };
      insertOrders(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
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
    deleteOrders: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({ message: "ID is Not Found" });
        }
        deleteOrders(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
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
  