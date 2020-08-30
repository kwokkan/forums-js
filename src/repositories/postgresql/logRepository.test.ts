
beforeEach(() => {
    jest.resetModules();
});

describe("addLog", () => {
    test("Log objects", async () => {
        const mockQuery = jest.fn();

        jest.doMock("./common", () => {
            return {
                __esModule: true,
                runQuery: mockQuery
            };
        });

        const repo = await import("..");
        await repo.addLog("This is a log");

        expect(mockQuery).toBeCalledWith(expect.stringMatching(/insert|log/g), ["This is a log"]);
    });
});
