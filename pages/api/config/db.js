import mysql from 'mysql2/promise';

export default async function db(query, data) {
    try {
        const db = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            port: process.env.MYSQL_PORT,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        })
        const [result] = await db.execute(query, data);
        await db.end();
        return result;
    } catch (error) {
        return error;
    }
}

