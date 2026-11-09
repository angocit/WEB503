import mysql from 'mysql2/promise'
export const db = mysql.createPool({
    host: 'localhost',
    port:'3306',
    database: 'wd21304',
    user:'root',
    password:'123456'
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