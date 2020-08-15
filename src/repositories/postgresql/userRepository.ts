import { IUser } from "../../types/IUser";
import { runQuery } from "./common";

export interface IUserTable {
    user_pk: number;
    joinedDate: Date;
    name: string;
    auth_provider: string;
    auth_id: string;
}

function mapUser(user: IUserTable): IUser {
    return {
        id: user.user_pk,
        joinedDate: user.joinedDate.getTime(),
        name: user.name
    }
}

export async function createUser(authProvider: string, authId: string, name: string): Promise<number> {
    const rows = await runQuery<Pick<IUserTable, "user_pk">>(
        `insert into "user"(auth_provider, auth_id, name) values ($1, $2, $3) returning user_pk`,
        [authProvider, authId, name]
    );

    return rows[0].user_pk;
}

export async function getUserByAuth(authProvider: string, authId: string): Promise<IUser | undefined> {
    const rows = await runQuery<IUserTable>(
        `select user_pk, "joinedDate", name from "user" where auth_provider = $1 and auth_id = $2`,
        [authProvider, authId]
    );

    return rows.map(mapUser)[0];
}

export async function getUserById(id: number): Promise<IUser | undefined> {
    const rows = await runQuery<IUserTable>(`select user_pk, "joinedDate", name from "user" where user_pk = $1`, [id]);

    return rows.map(mapUser)[0];
}

export async function getUsers(): Promise<IUser[]> {
    const rows = await runQuery<IUserTable>(`select user_pk, "joinedDate", name from "user"`);

    return rows.map(mapUser);
}
