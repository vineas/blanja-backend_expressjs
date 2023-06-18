let {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId
    // searchProduct,
    // findName
  } = require("../model/customer");
  const commonHelper = require("../helper/common");
  
  let customerController = {
    getAllCustomer: async (req, res) => {
      try {
        const sortby = req.query.sortby || "name";
        const sort = req.query.sort || "ASC";
        const result = await selectAllCustomer(sortby, sort);
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
  
    getDetailCustomer: async (req, res) => {
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return res.json({ message: "ID is Not Found" });
      }
      selectCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
  
    createCustomer: async (req, res) => {
      const {
        name, 
        email, 
        phone_number, 
        gender, 
        dateofbirth
      } = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name, 
        email, 
        phone_number, 
        gender, 
        dateofbirth
      };
      insertCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },
  
    updateCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const {
            name, 
            email, 
            phone_number, 
            gender, 
            dateofbirth
        } = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({ message: "ID is Not Found" });
        }
        const data = {
          id,
          name, 
        email, 
        phone_number, 
        gender, 
        dateofbirth
        };
        updateCustomer(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({ message: "ID is Not Found" });
        }
        deleteCustomer(id)
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
  
  module.exports = customerController;
  