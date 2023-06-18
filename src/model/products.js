const Pool = require('../config/db')

const selectAllProduct = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const selectProduct = (id) => {
    return Pool.query(`SELECT * FROM product WHERE id = ${id}`)
}

const insertProduct = (data) => {
    const { id,name, price, stock, image, rating_product, merk, category_id} = data;
    return Pool.query(`INSERT INTO product(id,name,price,stock, image, rating_product, merk, category_id) VALUES
    (${id},'${name}',${price},${stock},'${image}', '${rating_product}', '${merk}', ${category_id})`);
}

const updateProduct = (data) => {
    const { id, name, price, stock, image, rating_product, merk, category_id} = data;
    return Pool.query(`UPDATE product SET name='${name}', stock=${stock}, price=${price}, image ='${image}', rating_product='${rating_product}', merk ='${merk}', category_id = ${category_id} WHERE id=${id}`);
}

const deleteProduct = (id) => {
        return Pool.query(`DELETE FROM product WHERE id=${id}`);

}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM product')
  }

const findId =(id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM product WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

const searchProduct = (name) => {
  return Pool.query(`SELECT * FROM product WHERE name ILIKE '%${name}%'`)
}

module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId,
    searchProduct
    // findName
}