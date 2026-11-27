import mysql from 'mysql2/promise'
import env from 'dotenv'
export const db = mysql.createPool({
    host: env.config().parsed.HOST_URL,
    port:env.config().parsed.DB_PORT,
    database: env.config().parsed.DB_NAME,
    user:env.config().parsed.DB_USER,
    password:env.config().parsed.DB_PASS
})
export const testConnectDB = async ()=>{
    const conn = await db.getConnection()
    try {
        await conn.ping()
        console.log('Kết nối thành công');        
    } catch (error) {
        console.log('Kết nối thất bại');
    }
}