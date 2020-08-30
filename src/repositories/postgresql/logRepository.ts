import { runQuery } from "./common";

export interface ILogTable {
    log_pk: number;
    created: Date;
    message: string;
}

export async function addLog(message: string): Promise<void> {
    await runQuery<ILogTable>(
        `insert into log (message) values ($1)`,
        [message]
    );
}
