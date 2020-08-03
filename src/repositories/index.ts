import { getForumById, getForums } from "./postgresql/forumRepository";
import { getThreadById, getThreadsByForumId } from "./postgresql/threadRepository";

export { getForumById };
export { getForums };
export { getThreadsByForumId };
export { getThreadById };
