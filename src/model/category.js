const Pool = require('../config/db')

const selectAllCategory = (sortby, sort) => {
    return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort}`)
}

const selectCategory = (id) => {
    return Pool.query(`SELECT product.name, product.price, category.name AS kategori FROM product join category ON product.category_id = category.id WHERE category.id = ${id}`)
}

const insertCategory = (data) => {
    const { id, image, name } = data;
    return Pool.query(`INSERT INTO category(id, image, name) VALUES
    (${id}, '${image}', '${name}')`);
}

const updateCategory = (data) => {
    const { id, image, name } = data;
    return Pool.query(`UPDATE category SET image ='${image}', name='${name}' WHERE id=${id}`);
}

const deleteCategory = (id) => {
        return Pool.query(`DELETE FROM category WHERE id=${id}`);

}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM category')
  }

const findId =(id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM category WHERE id=${id}`,(error,result)=>{
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