import { getForumById, getForums } from "./postgresql/forumRepository";
import { getMessagesByThreadId } from "./postgresql/messageRepository";
import { getThreadById, getThreadsByForumId } from "./postgresql/threadRepository";
import { createUser, getUserByAuth, getUserById, getUsers } from "./postgresql/userRepository";

export { createUser };
export { getForumById };
export { getForums };
export { getMessagesByThreadId };
export { getThreadsByForumId };
export { getThreadById };
export { getUserByAuth };
export { getUserById };
export { getUsers };
