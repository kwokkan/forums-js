import * as repo from "../repositories";
import { IBreadcrumb } from "../types/IBreadcrumb";
import { logError } from "../utils/logging";

export async function getBreadcrumbsByThreadId(threadId: number): Promise<IBreadcrumb[]> {
    try {
        const thread = await repo.getThreadById(threadId);

        const forum = await repo.getForumById(thread!.forumId);

        return [
            {
                title: forum!.name,
                url: `/forums/${forum!.id}`
            },
            {
                title: thread!.name,
                url: `/threads/${threadId}`
            },
        ];
    }
    catch (error) {
        logError(error);

        return [];
    }
}
