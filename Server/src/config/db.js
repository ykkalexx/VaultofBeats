import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "alexbarbatescu",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "producer_platform",
  port: process.env.DB_PORT || 5432,
  max: 10, // connectionLimit equivalent
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});