import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const tableName = process.env.DB_TABLE_NAME;
const pool = mysql
  .createPool({
    host: process.env.MY_HOST,
    user: process.env.MY_USER,
    password: process.env.MY_PASS,
    database: process.env.MY_DB,
  })
  .promise();

async function insert(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [rows] = await pool.query(
    `INSERT INTO ${tableName} (name, email, password)
                    VALUES(?,?,?)`,
    [name, email, hashedPassword]
  );
  const id = rows.insertId;
  return getUser(id);
}

async function getUser(id) {
  const [rows] = await pool.query(
    `SELECT * 
                        FROM ${tableName} 
                        WHERE id = ?`,
    id
  );
  return rows[0];
}

async function getAllUsers() {
  const [rows] = await pool.query(`SELECT * FROM ${tableName}`);
  return rows;
}

async function login(email, password) {
  try {
    const [rows] = await pool.query(`SELECT * from ${tableName}
    WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0) {
      return null;
    }
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }
    delete user.password
    return user;
  } catch (error) {
     console.error('Error in findByEmailAndPassword:', error);
    throw error;
  }
}

export { insert, getUser, getAllUsers, login};
