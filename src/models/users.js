import { db } from "../config/db.js"

const findByEmail = async (email)=>{
    const sql = `select * from users where email = ?`
    const [data] = await db.execute(sql,[email])
    // console.log(data); 
    return data[0]||null
}
const create = async (user)=>{
    const sql = `insert into users (email,password) values (?,?)`
    const [data] = await db.execute(sql,[user.email,user.password])
    // console.log(data); 
    return data||null
}
export default {findByEmail,create}