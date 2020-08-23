import { IMessageTable } from "./messageRepository";

describe("addMessage", () => {
    test("Valid message", async () => {
        const mockQuery = jest.fn((): IMessageTable[] => [{
            content: "New message",
            created: new Date(),
            createdby_user_fk: 2,
            message_pk: 10,
            thread_fk: 1,
        }]);

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        const result = await repo.addMessage(1, 2, "New message");

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/\$1|\$2|\$3/g), expect.arrayContaining([1, 2, "New message"]));
        expect(result?.id).toStrictEqual(10);
    });
});
