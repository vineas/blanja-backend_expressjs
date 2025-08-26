import Pool from "../config/db.js";

export const selectAllProduct = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT product.*, category.category_name
  FROM product
  INNER JOIN category ON product.category_id = category.category_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
  // return Pool.query(`SELECT * FROM product ORDER BY ${sortby} ${sort} OFFSET ${offset}`)
}

export const selectProduct = (product_id) => {
  return Pool.query(`SELECT * FROM product WHERE product_id = '${product_id}'`)
}

export const selectProductBySellerId = (seller_id) => {
  return Pool.query(`SELECT * FROM product LEFT JOIN seller ON product.seller_id = seller.seller_id WHERE product.seller_id='${seller_id}'`);
};

export const insertProduct = (data) => {
  const { product_id, product_name, product_price, product_stock, product_image, description_product, category_id, seller_id } = data;
  return Pool.query(`INSERT INTO product(product_id,product_name,product_price,product_stock,product_image, description_product, category_id, seller_id) VALUES
    ('${product_id}','${product_name}',${product_price},${product_stock},'${product_image}', '${description_product}', ${category_id}, '${seller_id}')`);
}

export const updateProduct = (data) => {
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


export const deleteProduct = (product_id) => {
  return Pool.query(`DELETE FROM product WHERE product_id='${product_id}'`);
}

export const deleteProductBySellerId = (seller_id, product_id) => {
  return Pool.query(`DELETE FROM product WHERE product.seller_id='${seller_id}' AND product.product_id='${product_id}'`);
};

export const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM product')
}

export const findUUID = (product_id) => {
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

export const findSellerId = (seller_id) => {
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

export const searchProduct = (product_name) => {
  return Pool.query(`SELECT * FROM product WHERE product_name ILIKE '%${product_name}%'`)
}

