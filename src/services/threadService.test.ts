import { IForum } from "../types/IForum";
import { IMessage } from "../types/IMessage";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";

beforeEach(() => {
    jest.resetModules();
});

describe("addMessage", () => {
    test("undefined id - returns", async () => {
        const { addMessage } = await import("./threadService");

        const result = await addMessage(undefined, 1, "New message");

        expect(result).toBeUndefined();
    });

    test("Invalid thread - throws error", async () => {
        const mockGetThreadById = jest.fn(() => undefined);

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                getThreadById: mockGetThreadById
            };
        });

        const { addMessage } = await import("./threadService");

        const result = async () => await addMessage(1, 2, "New message");

        await expect(result).rejects.toThrowError("Thread 1 does not exist.");

        expect(mockGetThreadById).toBeCalledWith(1);
    });

    test("Failed add message - throws error", async () => {
        const mockAddMessage = jest.fn(() => undefined);
        const mockGetThreadById = jest.fn((): IThread => ({
            created: 1,
            id: 1,
            name: "1 thread",
            messages: []
        }));

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addMessage: mockAddMessage,
                getThreadById: mockGetThreadById
            };
        });

        const { addMessage } = await import("./threadService");

        const result = async () => await addMessage(1, 2, "New message");

        await expect(result).rejects.toThrowError("Failed to add message.");

        expect(mockGetThreadById).toBeCalledWith(1);
        expect(mockAddMessage).toBeCalledWith(1, 2, "New message");
    });

    test("Add success", async () => {
        const mockAddMessage = jest.fn((): IMessage => ({
            content: "New message",
            created: 1,
            id: 1,
            user: {
                id: 2,
                joinedDate: 1,
                name: "2"
            }
        }));
        const mockGetThreadById = jest.fn((): IThread => ({
            created: 1,
            id: 1,
            name: "1 thread",
            messages: []
        }));
        const mockGetUserById = jest.fn((): IUser => ({
            id: 2,
            joinedDate: 1,
            name: "Test user"
        }));

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addMessage: mockAddMessage,
                getThreadById: mockGetThreadById,
                getUserById: mockGetUserById
            };
        });

        const { addMessage } = await import("./threadService");

        const result = await addMessage(1, 2, "New message");

        const expected: IMessage = {
            content: "New message",
            created: 1,
            id: 1,
            user: {
                id: 2,
                joinedDate: 1,
                name: "Test user"
            }
        };

        expect(result).toStrictEqual(expected);

        expect(mockGetThreadById).toBeCalledWith(1);
        expect(mockAddMessage).toBeCalledWith(1, 2, "New message");
        expect(mockGetUserById).toBeCalledWith(2);
    });
});

describe("addThread", () => {
    test("undefined forumId - returns undefined", async () => {
        const { addThread } = await import("./threadService");

        const result = await addThread(undefined, 1, "New title", "New message");

        expect(result).toBeUndefined();
    });

    test("Invalid forum - throws error", async () => {
        const mockGetForumById = jest.fn(() => undefined);

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                getForumById: mockGetForumById
            };
        });

        const { addThread } = await import("./threadService");

        const result = async () => await addThread(10, 1, "New title", "New message");

        expect(result).rejects.toThrowError("Forum 10 does not exist.");

        expect(mockGetForumById).toBeCalledWith(10);
    });

    test("Add thread error - throws error", async () => {
        const mockGetForumById = jest.fn((): IForum => ({
            created: 1,
            id: 10,
            name: "Test forum"
        }));
        const mockAddThread = jest.fn(() => undefined);

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addThread: mockAddThread,
                getForumById: mockGetForumById
            };
        });

        const { addThread } = await import("./threadService");

        const result = async () => await addThread(10, 1, "New title", "New message");

        await expect(result).rejects.toThrowError("Failed to add thread.");

        expect(mockGetForumById).toBeCalledWith(10);
        expect(mockAddThread).toBeCalledWith({ forumId: 10, name: "New title", userId: 1 });
        expect(mockAddThread).toBeCalled();
    });

    test("Add message error - throws error", async () => {
        const mockGetForumById = jest.fn((): IForum => ({
            created: 1,
            id: 10,
            name: "Test forum"
        }));
        const mockAddThread = jest.fn((): IThread => ({
            created: 1,
            id: 30,
            name: "New title",
            messages: []
        }));
        const mockAddMessage = jest.fn(() => undefined);

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addMessage: mockAddMessage,
                addThread: mockAddThread,
                getForumById: mockGetForumById
            };
        });

        const { addThread } = await import("./threadService");

        const result = async () => await addThread(10, 1, "New title", "New message");

        await expect(result).rejects.toThrowError("Failed to add message.");

        expect(mockGetForumById).toBeCalledWith(10);
        expect(mockAddThread).toBeCalledWith({ forumId: 10, name: "New title", userId: 1 });
        expect(mockAddMessage).toBeCalledWith(30, 1, "New message");
    });

    test("Add thread - success", async () => {
        const mockGetForumById = jest.fn((): IForum => ({
            created: 1,
            id: 10,
            name: "Test forum"
        }));
        const mockAddThread = jest.fn((): IThread => ({
            created: 1,
            id: 30,
            name: "New title",
            messages: []
        }));
        const mockAddMessage = jest.fn((): IMessage => ({
            content: "New message",
            created: 1,
            id: 40,
            user: {
                id: 1,
                joinedDate: 1,
                name: "1"
            }
        }));

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addMessage: mockAddMessage,
                addThread: mockAddThread,
                getForumById: mockGetForumById
            };
        });

        const { addThread } = await import("./threadService");

        const result = await addThread(10, 1, "New title", "New message");

        expect(result!.id).toBe(30);

        expect(mockGetForumById).toBeCalledWith(10);
        expect(mockAddThread).toBeCalledWith({ forumId: 10, name: "New title", userId: 1 });
        expect(mockAddMessage).toBeCalledWith(30, 1, "New message");
    });
});
