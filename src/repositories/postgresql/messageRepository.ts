import { IMessage } from "../../types/IMessage";
import { runQuery } from "./common";

interface IMessageTable {
    message_pk: number;
    created: Date;
    content: string;
    createdby_user_fk: number;
    thread_fk: number;
}

export async function getMessagesByThreadId(threadId: number): Promise<IMessage[]> {
    const rows = await runQuery<IMessageTable>(`select message_pk, created, content, createdby_user_fk, thread_fk from message where thread_fk = $1`, [threadId]);

    return rows.map(x => ({
        id: x.message_pk,
        created: x.created.getTime(),
        content: x.content,
        user: {
            id: x.createdby_user_fk,
            name: x.createdby_user_fk.toString(),
            joinedDate: x.created.getTime()
        },
    }));
}
