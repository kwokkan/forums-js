import { getForumById, getForums } from "./postgresql/forumRepository";
import { getMessagesByThreadId } from "./postgresql/messageRepository";
import { getThreadById, getThreadsByForumId } from "./postgresql/threadRepository";
import { getUserById, getUsers } from "./postgresql/userRepository";

export { getForumById };
export { getForums };
export { getMessagesByThreadId };
export { getThreadsByForumId };
export { getThreadById };
export { getUserById };
export { getUsers };
