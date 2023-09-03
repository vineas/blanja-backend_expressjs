let {
    selectAllPayment,
    // selectCategory,
    insertPayment,
    deletePayment,
    countData,
    findId,
    searchPayment
  } = require("../model/payment");
  const commonHelper = require("../helper/common");
  
  let paymentController = {
    getAllPayment: async (req, res) => {
      try {
        const sortby = req.query.sortby || "payment_name";
        const sort = req.query.sort || "ASC";
        const search = req.query.search || "";
        const result = await selectAllPayment(sortby, sort, search);
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
  
    getSearchPayment: async (req, res) => {
      try {
        const searchBy = req.query.keyword;
        const result = await searchPayment(searchBy);
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }    
    },
  
    getDetailCategory: async (req, res) => {
      const category_id = Number(req.params.id);
      const { rowCount } = await findId(category_id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }
      // res.send("ada");
      selectCategory(category_id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
  
    createPayment: async (req, res) => {
      const { payment_name } =
        req.body;
      const {
        rows: [count],
      } = await countData();
      const payment_id = Number(count.count) + 1;
      const data = {
        payment_id,
        payment_name
      };
      insertPayment(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Payment created")
        )
        .catch((err) => res.send(err));
    },
  
    deletePayment: async (req, res) => {
      try {
        const payment_id = Number(req.params.id);
        const { rowCount } = await findId(payment_id);
        if (!rowCount) {
          res.json({ message: "ID is Not Found" });
        }
        deleteCategory(payment_id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = paymentController;
  