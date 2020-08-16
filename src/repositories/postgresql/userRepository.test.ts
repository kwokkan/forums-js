import { IUser } from "../../types/IUser";
import { IUserTable } from "./userRepository";

beforeEach(() => {
    jest.resetModules();
});

describe("createUser", () => {
    test("Create new user", async () => {
        const mockQuery = jest.fn((): IUserTable[] => [{
            user_pk: 10,
            joinedDate: new Date(2020, 1, 1),
            name: "test user",
            auth_provider: "github",
            auth_id: "1"
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.createUser("github", "1", "test user");

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/\$1|\$2|\$3/g), expect.arrayContaining(["github", "1", "test user"]));
        expect(result).toStrictEqual(10);
    });
});

describe("getUserByAuth", () => {
    test("Return user from db", async () => {
        const mockQuery = jest.fn((): IUserTable[] => [{
            user_pk: 10,
            joinedDate: new Date(2020, 1, 1),
            name: "test",
            auth_provider: "github",
            auth_id: "1"
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getUserByAuth("github", "1");

        const expected: IUser = {
            id: 10,
            joinedDate: 1580515200000,
            name: "test"
        };
        expect(mockQuery).toBeCalledWith(expect.stringContaining("$1"), expect.arrayContaining(["github", "1"]));
        expect(result).toStrictEqual(expected);
    });
});

describe("getUserById", () => {
    test("Return user from db", async () => {
        const mockQuery = jest.fn((): IUserTable[] => [{
            user_pk: 10,
            joinedDate: new Date(2020, 1, 1),
            name: "test",
            auth_provider: "github",
            auth_id: "1"
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getUserById(10);

        const expected: IUser = {
            id: 10,
            joinedDate: 1580515200000,
            name: "test"
        };
        expect(mockQuery).toBeCalledWith(expect.stringContaining("$1"), expect.arrayContaining([10]));
        expect(result).toStrictEqual(expected);
    });
});

describe("getUsers", () => {
    test("No rows", async () => {
        const mockQuery = jest.fn((): IUserTable[] => []);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getUsers();

        expect(result).toStrictEqual([]);
    });

    test("Multiple rows", async () => {
        const mockQuery = jest.fn((): IUserTable[] => [
            {
                user_pk: 10,
                joinedDate: new Date(2020, 1, 1),
                name: "test",
                auth_provider: "github",
                auth_id: "1"
            },
            {
                user_pk: 20,
                joinedDate: new Date(2020, 1, 1),
                name: "test2",
                auth_provider: "github",
                auth_id: "2"
            }
        ]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getUsers();

        const expected: IUser[] = [
            {
                id: 10,
                joinedDate: 1580515200000,
                name: "test"
            },
            {
                id: 20,
                joinedDate: 1580515200000,
                name: "test2"
            }
        ];
        expect(result).toStrictEqual(expected);
    });
});
