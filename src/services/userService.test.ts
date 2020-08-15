import { IUser } from "../types/IUser";

beforeEach(() => {
    jest.resetModules();
});

describe("getOrCreateAuthUser", () => {
    test("User does not exist - create new user", async () => {
        const mockCreateUser = jest.fn(() => 321);
        const mockGetUserByAuth = jest.fn((): IUser | undefined => undefined);
        const mockGetUserById = jest.fn((): IUser => ({
            id: 321,
            name: "New user",
            joinedDate: 999
        }));

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                createUser: mockCreateUser,
                getUserByAuth: mockGetUserByAuth,
                getUserById: mockGetUserById
            };
        });

        const { getOrCreateAuthUser } = await import("./userService");

        const result = await getOrCreateAuthUser("github", "1", "Test user");

        expect(mockGetUserByAuth).toBeCalledWith("github", "1");
        expect(mockGetUserById).toBeCalledWith(321);
        expect(result.id).toStrictEqual(321);
    });

    test("User exists - return user id", async () => {
        const mockGetUserByAuth = jest.fn((): IUser => ({
            id: 123,
            name: "Test user",
            joinedDate: 1
        }));

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                getUserByAuth: mockGetUserByAuth
            };
        })

        const { getOrCreateAuthUser } = await import("./userService");

        const result = await getOrCreateAuthUser("github", "1", "Test user");

        expect(mockGetUserByAuth).toBeCalledWith("github", "1");
        expect(result.id).toStrictEqual(123);
    });
});
