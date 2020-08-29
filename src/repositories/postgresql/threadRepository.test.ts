import { IThreadTable } from "./threadRepository";

beforeEach(() => {
    jest.resetModules();
});

describe("addThread", () => {
    test("Create new thread", async () => {
        const mockQuery = jest.fn((): IThreadTable[] => [{
            created: new Date(2020, 1, 2),
            createdby_user_fk: 2,
            forum_fk: 3,
            name: "New thread",
            thread_pk: 4
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.addThread({ forumId: 3, name: "New thread", userId: 2 });

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/\$1|\$2|\$3/g), expect.arrayContaining(["New thread", 2, 3]));
        expect(result.id).toStrictEqual(4);
    });
});

describe("getThreadById", () => {
    test("Get existing thread", async () => {
        const mockQuery = jest.fn((): IThreadTable[] => [{
            created: new Date(2020, 1, 2),
            createdby_user_fk: 2,
            forum_fk: 3,
            name: "New thread",
            thread_pk: 4
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getThreadById(4);

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/\$1/g), expect.arrayContaining([4]));
        expect(result!.id).toStrictEqual(4);
    });
});

describe("getThreadsByForumId", () => {
    test("Get existing thread", async () => {
        const mockQuery = jest.fn((): IThreadTable[] => [
            {
                created: new Date(2020, 1, 2),
                createdby_user_fk: 2,
                forum_fk: 3,
                name: "New thread",
                thread_pk: 4
            },
            {
                created: new Date(2020, 1, 2),
                createdby_user_fk: 2,
                forum_fk: 3,
                name: "New thread 2",
                thread_pk: 5
            }
        ]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.getThreadsByForumId(3);

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/\$1/g), expect.arrayContaining([3]));
        expect(result.length).toStrictEqual(2);
        expect(result.filter(x => x.id === 4).length).toStrictEqual(1);
        expect(result.filter(x => x.id === 5).length).toStrictEqual(1);
    });
});
