import { IThreadTable } from "./threadRepository";

beforeEach(() => {
    jest.resetModules();
});

describe("addThread", () => {
    test("Create new user", async () => {
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
