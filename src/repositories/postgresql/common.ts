import { Pool } from "pg";

const env = process.env;

const pool = new Pool({
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    application_name: "forums-js"
});

export async function runQuery<TModel>(query: string, values?: any[]): Promise<TModel[]> {
    try {
        const result = await pool.query<TModel>(query, values);

        return result.rows;
    }
    catch (e) {
        console.error(e);

        return [];
    }
}
