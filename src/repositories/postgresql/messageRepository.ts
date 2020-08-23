import { IMessage } from "../../types/IMessage";
import { runQuery } from "./common";

export interface IMessageTable {
    message_pk: number;
    created: Date;
    content: string;
    createdby_user_fk: number;
    thread_fk: number;
}

function mapMessage(message: IMessageTable): IMessage {
    return {
        id: message.message_pk,
        created: message.created.getTime(),
        content: message.content,
        user: {
            id: message.createdby_user_fk,
            name: message.createdby_user_fk.toString(),
            joinedDate: message.created.getTime()
        },
    };
}

export async function addMessage(threadId: number, userId: number, message: string): Promise<IMessage | undefined> {
    const rows = await runQuery<IMessageTable>(`insert into message(thread_fk, createdby_user_fk, content) values ($1, $2, $3) returning *`, [threadId, userId, message]);

    return rows.map(mapMessage)[0];
}

export async function getMessagesByThreadId(threadId: number): Promise<IMessage[]> {
    const rows = await runQuery<IMessageTable>(`select message_pk, created, content, createdby_user_fk, thread_fk from message where thread_fk = $1`, [threadId]);

    return rows.map(mapMessage);
}
