import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { IMessage } from "../types/IMessage";

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

        expect(result).rejects.toThrowError("Thread 1 does not exist.");

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

        expect(result).rejects.toThrowError("Failed to add message.");

        await Promise.resolve();

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
