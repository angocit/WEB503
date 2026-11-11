import { db } from "../config/db.js"

const findAll = async ()=>{
    const sql = `select * from products`
    const [data] = await db.execute(sql)
    return data
}
const create = async (product)=>{
    const sql = `insert into products(name,image,price) values (?,?,?)`
    const [data] = await db.execute(sql,[product.name,product.image,product.price])
    return data
}
const update = async (id,product)=>{
    const sql = `update products set name=?,image=?,price=? where id=?`
    const [data] = await db.execute(sql,[product.name,product.image,product.price,id])
    if (!data.affectedRows) return []
    return {...product,id}
}
const findById = async (id)=>{
    const sql = `select * from products where id = ?`
    const [data] = await db.execute(sql,[id])
    console.log(data);
    
    return data.length||null
}
export default {findAll,create,update,findById}