const Pool = require('../config/db')

const selectAllCustomer = (sortby, sort) => {
    return Pool.query(`SELECT * FROM customer ORDER BY ${sortby} ${sort}`)
}

const selectCustomer = (id) => {
    return Pool.query(`SELECT * FROM customer WHERE id = ${id}`)
}

const insertCustomer = (data) => {
    const { id, name, email, phone_number, gender, dateofbirth} = data;
    return Pool.query(`INSERT INTO customer(id, name, email, phone_number, gender, dateofbirth) VALUES
    (${id},'${name}','${email}',${phone_number},'${gender}', '${dateofbirth}')`);
}

const updateCustomer = (data) => {
    const { id, name, email, phone_number, gender, dateofbirth} = data;
    return Pool.query(`UPDATE customer SET name='${name}', email='${email}', phone_number=${phone_number}, gender='${gender}', dateofbirth='${dateofbirth}' WHERE id=${id}`);
}

const deleteCustomer = (id) => {
        return Pool.query(`DELETE FROM customer WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM customer')
  }

const findId =(id) => {
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM customer WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

// const findName =(name) => {
//   return  new Promise ((resolve,reject)=> 
//   Pool.query(`SELECT * FROM product WHERE name='${name}'`,(error,result)=>{
//     if(!error){
//       resolve(result)
//     }else{
//       reject(error)
//     }
//   })
//   )
// }


// const searchProduct = (keyword, search) => {
//   return Pool.query(`SELECT * FROM product WHERE ${keyword} = ${search}`)
// }

// ILIKE '%${search}%'

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    // searchCustomer,
    // findName
}