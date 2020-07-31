import { IThread } from "../types/IThread";
import { mockForums } from "./mockForums";

export function getThreadById(id?: number): Promise<IThread | undefined> {
    const thread = mockForums
        .filter(x => x.threads)
        .flatMap(x => x.threads!)
        .find(x => x.id == id);

    return Promise.resolve(thread);
}
