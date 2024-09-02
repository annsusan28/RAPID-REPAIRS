import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = () =>
  mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "test",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  });

export default connection;
