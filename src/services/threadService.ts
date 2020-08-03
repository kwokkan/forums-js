import { IThread } from "../types/IThread";
import * as repo from "./../repositories";

export async function getThreadById(id?: number): Promise<IThread | undefined> {
    if (id === undefined) {
        return;
    }

    const thread = await repo.getThreadById(id);

    if (thread) {
        const messages = await repo.getMessagesByThreadId(id);
        thread.messages = messages;
    }

    return thread;
}
