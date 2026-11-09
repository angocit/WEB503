import { db } from "../config/db.js"

const findAll = async ()=>{
    const sql = `select * from products`
    const [data] = await db.execute(sql)
    return data
}

export default {findAll}