import { IThread } from "../../types/IThread";
import { runQuery } from "./common";

interface ThreadTable {
    thread_pk: number;
    created: Date;
    name: string;
    createdby_user_fk: number;
    forum_fk: number;
}

export async function getThreadById(id: number): Promise<IThread | undefined> {
    const rows = await runQuery<ThreadTable>(`select thread_pk, created, name, createdby_user_fk, forum_fk from thread where thread_pk = $1`, [id]);

    return rows.map(x => ({
        id: x.thread_pk,
        created: x.created.getTime(),
        name: x.name,
        messages: []
    }))[0];
}

export async function getThreadsByForumId(forumId: number): Promise<IThread[]> {
    const rows = await runQuery<ThreadTable>(`select thread_pk, created, name, createdby_user_fk, forum_fk from thread where forum_fk = $1`, [forumId]);

    return rows.map(x => ({
        id: x.thread_pk,
        created: x.created.getTime(),
        name: x.name,
        messages: []
    }));
}
