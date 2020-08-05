import { Pool } from "pg";

const env = process.env;

export const pool = new Pool({
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    application_name: "forums-js",
    ssl: true
});
