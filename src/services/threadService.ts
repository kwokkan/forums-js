import { IMessage } from "../types/IMessage";
import { IThread } from "../types/IThread";
import { logDebug } from "../utils/logging";
import * as repo from "./../repositories";

export async function addMessage(id: number | undefined, userId: number, message: string): Promise<IMessage | undefined> {
    logDebug("addMessage", id, userId, message);

    if (id === undefined) {
        return;
    }

    const thread = await repo.getThreadById(id);

    if (!thread) {
        throw new Error(`Thread ${id} does not exist.`);
    }

    const created = await repo.addMessage(id, userId, message);

    if (!created) {
        throw new Error(`Failed to add message.`);
    }

    const user = await repo.getUserById(created.user.id);
    created.user = user!;

    return created;
}

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
