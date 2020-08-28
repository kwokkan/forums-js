import { logDebug } from "../../utils/logging";
import { pool } from "./pool";

export async function runQuery<TModel>(query: string, values?: any[]): Promise<TModel[]> {
    try {
        logDebug("runQuery", query, values);

        const result = await pool.query<TModel>(query, values);

        return result.rows;
    }
    catch (e) {
        console.error(e);

        return [];
    }
}
