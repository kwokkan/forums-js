import { IThread } from "../../types/IThread";
import { runQuery } from "./common";

interface IThreadTable {
    thread_pk: number;
    created: Date;
    name: string;
    createdby_user_fk: number;
    forum_fk: number;
}

interface IAddTheadParams {
    forumId: number;
    name: string;
    userId: number;
}

function mapThread(thread: IThreadTable): IThread {
    return {
        created: thread.created.getTime(),
        id: thread.thread_pk,
        messages: [],
        name: thread.name
    };
}

export async function addThread(params: IAddTheadParams): Promise<IThread> {
    const rows = await runQuery<IThreadTable>(
        `insert into thread (name, createdby_user_fk, forum_fk) values ($1, $2, $3) returning *`,
        [params.name, params.userId, params.forumId]
    );

    return rows.map(mapThread)[0];
}

export async function getThreadById(id: number): Promise<IThread | undefined> {
    const rows = await runQuery<IThreadTable>(`select thread_pk, created, name, createdby_user_fk, forum_fk from thread where thread_pk = $1`, [id]);

    return rows.map(mapThread)[0];
}

export async function getThreadsByForumId(forumId: number): Promise<IThread[]> {
    const rows = await runQuery<IThreadTable>(`select thread_pk, created, name, createdby_user_fk, forum_fk from thread where forum_fk = $1`, [forumId]);

    return rows.map(mapThread);
}
