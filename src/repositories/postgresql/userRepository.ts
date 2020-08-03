import { IUser } from "../../types/IUser";
import { runQuery } from "./common";

interface UserTable {
    user_pk: number;
    joinedDate: Date;
    name: string;
}

export async function getUserById(id: number): Promise<IUser | undefined> {
    const rows = await runQuery<UserTable>(`select user_pk, "joinedDate", name from "user" where user_pk = $1`, [id]);

    return rows.map(x => ({
        id: x.user_pk,
        joinedDate: x.joinedDate.getTime(),
        name: x.name
    }))[0];
}

export async function getUsers(): Promise<IUser[]> {
    const rows = await runQuery<UserTable>(`select user_pk, "joinedDate", name from "user"`);

    return rows.map(x => ({
        id: x.user_pk,
        joinedDate: x.joinedDate.getTime(),
        name: x.name
    }));
}
