import dotenv from 'dotenv';
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  user: dotenv.config().parsed.PGUSER,
  host: dotenv.config().parsed.PGHOST,
  database: dotenv.config().parsed.PGDATABASE,
  password: dotenv.config().parsed.PGPASSWORD,
  port: dotenv.config().parsed.PGPORT
});

export default pool;