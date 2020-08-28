import { getForumById, getForums } from "./postgresql/forumRepository";
import { addMessage, getMessagesByThreadId } from "./postgresql/messageRepository";
import { addThread, getThreadById, getThreadsByForumId } from "./postgresql/threadRepository";
import { createUser, getUserByAuth, getUserById, getUsers } from "./postgresql/userRepository";

export { addMessage };
export { addThread };
export { createUser };
export { getForumById };
export { getForums };
export { getMessagesByThreadId };
export { getThreadsByForumId };
export { getThreadById };
export { getUserByAuth };
export { getUserById };
export { getUsers };
