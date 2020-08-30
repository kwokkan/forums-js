
describe("addLog", () => {
    test("Add log", async () => {

        const mockAddLog = jest.fn(() => undefined);

        jest.doMock("../repositories", () => {
            return {
                __esModule: true,
                addLog: mockAddLog
            };
        });

        const { addLog } = await import("./logService");

        await addLog("Test message", 100, false);

        expect(mockAddLog).toBeCalledWith(expect.stringMatching(/Test message|100|false/g));
    });
});
