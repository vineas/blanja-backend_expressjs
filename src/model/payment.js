const Pool = require('../config/db')

const selectAllPayment = (sortby, sort) => {
    return Pool.query(`SELECT * FROM payment ORDER BY ${sortby} ${sort}`)
}

// const selectPayment = (payment_id) => {
//     return Pool.query(`SELECT product.product_name, product.product_price, category.category_name AS kategori FROM product join category ON product.category_id = category.category_id WHERE category.category_id = ${category_id}`)
// }

const insertPayment = (data) => {
    const { payment_id, payment_name} = data;
    return Pool.query(`INSERT INTO payment (payment_id, payment_name) VALUES
    (${payment_id}, '${payment_name}')`);
}

const deletePayment = (payment_id) => {
        return Pool.query(`DELETE FROM payment WHERE payment_id=${payment_id}`);

}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM payment')
  }

const findId =(payment_id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT payment_id FROM payment WHERE payment_id=${payment_id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

const searchPayment = (name) => {
  return Pool.query(`SELECT * FROM payment_id WHERE name ILIKE '%${name}%'`)
}

module.exports = {
    selectAllPayment,
    // selectCategory,
    insertPayment,
    // updateCategory,
    deletePayment,
    countData,
    findId,
    searchPayment
}