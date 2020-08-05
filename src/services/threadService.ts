import { IThread } from "../types/IThread";
import * as repo from "./../repositories";

export async function getThreadById(id?: number): Promise<IThread | undefined> {
    if (id === undefined) {
        return;
    }

    const thread = await repo.getThreadById(id);

    if (thread) {
        const messages = await repo.getMessagesByThreadId(id);

        for (const message of messages) {
            const user = await repo.getUserById(message.user.id);
            message.user = user!;
        }

        thread.messages = messages;
    }

    return thread;
}
