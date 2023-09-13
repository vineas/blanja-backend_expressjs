const Pool = require('../config/db')

const selectAllProduct = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT product.*, category.category_name
  FROM product
  INNER JOIN category ON product.category_id = category.category_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
  // return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} OFFSET ${offset}`)
}

const selectProduct = (product_id) => {
  return Pool.query(`SELECT * FROM product WHERE product_id = '${product_id}'`)
}

const selectProductBySellerId = (seller_id) => {
  return Pool.query(`SELECT * FROM product LEFT JOIN seller ON product.seller_id = seller.seller_id WHERE product.seller_id='${seller_id}'`);
};

const insertProduct = (data) => {
  const { product_id, product_name, product_price, product_stock, product_image, description_product, category_id, seller_id } = data;
  return Pool.query(`INSERT INTO product(product_id,product_name,product_price,product_stock,product_image, description_product, category_id, seller_id) VALUES
    ('${product_id}','${product_name}',${product_price},${product_stock},'${product_image}', '${description_product}', ${category_id}, '${seller_id}')`);
}

const updateProduct = (data) => {
  const { product_id, product_name, product_price, product_stock, product_image, description_product, category_id} = data;
  return Pool.query(`UPDATE product SET 
  product_name='${product_name}', 
  product_price=${product_price}, 
  product_stock=${product_stock}, 
  product_image ='${product_image}', 
  description_product='${description_product}', 
  category_id=${category_id} 
  WHERE product_id='${product_id}'`);
}


const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM product WHERE product_id='${product_id}'`);
}

const deleteProductBySellerId = (seller_id, product_id) => {
  return Pool.query(`DELETE FROM product WHERE product.seller_id='${seller_id}' AND product.product_id='${product_id}'`);
};

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM product')
}

const findUUID = (product_id) => {
  return new Promise((resolve, reject) =>
      Pool.query(
          `SELECT product FROM product WHERE product_id='${product_id}'`,
          (error, result) => {
              if (!error) {
                  resolve(result);
              } else {
                  reject(error);
              }
          }
      )
  );
};

const findSellerId = (seller_id) => {
  return new Promise((resolve, reject) =>
      Pool.query(
          `SELECT product FROM product WHERE seller_id='${seller_id}'`,
          (error, result) => {
              if (!error) {
                  resolve(result);
              } else {
                  reject(error);
              }
          }
      )
  );
};

const searchProduct = (name) => {
  return Pool.query(`SELECT * FROM product WHERE name ILIKE '%${name}%'`)
}

module.exports = {
  selectAllProduct,
  selectProduct,
  selectProductBySellerId,
  insertProduct,
  updateProduct,
  deleteProduct,
  deleteProductBySellerId,
  countData,
  findUUID,
  findSellerId,
  searchProduct
}




// const Pool = require('../config/db')
// const selectAll = ({limit,offset,sort,sortby}) => {
//   return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
// }
// const select = (id) => {
//   return Pool.query(`SELECT * FROM products WHERE id=${id}`)
// }
// const insert = (data) => {
//   const { id,name,stock,price,photo,description } = data
  // return Pool.query(`INSERT INTO products(id,name,stock,price,photo,description) VALUES
  // (${id},'${name}',${stock},${price},'${photo}','${description}')`)
// }
// const update = (data) => {
//   const { id,name,stock,price,photo,description } = data
//   return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price} ,photo='${photo}' ,description='${description}' WHERE id='${id}'`)
// }
// const deleteData = (id) => {
//   return Pool.query(`DELETE FROM products WHERE id=${id}`)
// }

// const countData = () =>{
//   return Pool.query('SELECT COUNT(*) FROM products')
// }

// const findId =(id)=>{
//   return  new Promise ((resolve,reject)=> 
//   Pool.query(`SELECT id FROM products WHERE id=${id}`,(error,result)=>{
//     if(!error){
//       resolve(result)
//     }else{
//       reject(error)
//     }
//   })
//   )
// }

// module.exports = {
//   selectAll,
//   select,
//   insert,
//   update,
//   deleteData,
//   countData,
//   findId
// }