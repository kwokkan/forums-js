import { IForum } from "../../types/IForum";
import { runQuery } from "./common";

interface ForumTable {
    forum_pk: number;
    created: Date;
    name: string;
    description: string;
    createdby_user_fk: number;
}

export async function getForumById(id: number): Promise<IForum | undefined> {
    const rows = await runQuery<ForumTable>(`select forum_pk, created, name, description, createdby_user_fk from forum where forum_pk = $1`, [id]);

    return rows.map(x => ({
        id: x.forum_pk,
        created: x.created.getTime(),
        name: x.name,
        description: x.description,
    }))[0];
}

export async function getForums(): Promise<IForum[]> {
    const rows = await runQuery<ForumTable>(`select forum_pk, created, name, description, createdby_user_fk from forum`);

    return rows.map(x => ({
        id: x.forum_pk,
        created: x.created.getTime(),
        name: x.name,
        description: x.description,
    }));
}
