let {
  selectAllCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countData,
  findId,
  searchCategory
} = require("../model/category");
const commonHelper = require("../helper/common");

let categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const sortby = req.query.sortby || "category_name";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await selectAllCategory(sortby, sort, search);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (error) {
      console.log(error);
    }
  },

  getSearchCategory: async (req, res) => {
    try {
      const searchBy = req.query.keyword;
      const result = await searchCategory(searchBy);
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

  createCategory: async (req, res) => {
    const { category_name } =
      req.body;
    const {
      rows: [count],
    } = await countData();
    const category_id = Number(count.count) + 1;
    const data = {
      category_id,
      category_name
    };
    insertCategory(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Category created")
      )
      .catch((err) => res.send(err));
  },

  updateCategory: async (req, res) => {
    try {
      const category_id = Number(req.params.id);
      const { name } = req.body;
      const { rowCount } = await findId(category_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        category_id,
        name
      };
      updateCategory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category_id = Number(req.params.id);
      const { rowCount } = await findId(category_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteCategory(category_id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = categoryController;
