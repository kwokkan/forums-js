import { createUser, getUserByAuth, getUserById } from "../repositories";
import { IUser } from "../types/IUser";

export async function getOrCreateAuthUser(authProvider: string, authId: string, name: string): Promise<IUser> {
    let user = await getUserByAuth(authProvider, authId);


    if (!user) {
        const userId = await createUser(authProvider, authId, name);

        user = await getUserById(userId);
    }

    return user!;
}
