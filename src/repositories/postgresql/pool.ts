import { Pool } from "pg";
import { dbConfig } from "../../utils/config";

export const pool = new Pool({
    host: dbConfig.host,
    database: dbConfig.database,
    user: dbConfig.username,
    password: dbConfig.password,
    application_name: "forums-js",
    ssl: dbConfig.ssl ? {
        rejectUnauthorized: false
    } : undefined
});
