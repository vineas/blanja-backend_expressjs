const Pool = require('../config/db')

const selectAllCategory = (sortby, sort) => {
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort}`)
}

const selectCategory = (category_id) => {
    return Pool.query(`SELECT product.product_name, product.product_price, category.category_name AS kategori FROM product join category ON product.category_id = category.category_id WHERE category.category_id = ${category_id}`)
}

const insertCategory = (data) => {
    const { category_id, category_name} = data;
    return Pool.query(`INSERT INTO category (category_id, category_name) VALUES
    (${category_id}, '${category_name}')`);
}

const updateCategory = (data) => {
    const { category_id, category_name } = data;
    return Pool.query(`UPDATE category SET category_name='${category_name}' WHERE category_id=${category_id}`);
}

const deleteCategory = (category_id) => {
        return Pool.query(`DELETE FROM category WHERE category_id=${category_id}`);

}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM category')
  }

const findId =(category_id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT category_id FROM category WHERE category_id=${category_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

const searchCategory = (name) => {
  return Pool.query(`SELECT * FROM category WHERE name ILIKE '%${name}%'`)
}

module.exports = {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countData,
    findId,
    searchCategory
}