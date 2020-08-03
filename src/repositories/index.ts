import { getForumById, getForums } from "./postgresql/forumRepository";
import { getMessagesByThreadId } from "./postgresql/messageRepository";
import { getThreadById, getThreadsByForumId } from "./postgresql/threadRepository";

export { getForumById };
export { getForums };
export { getMessagesByThreadId };
export { getThreadsByForumId };
export { getThreadById };
