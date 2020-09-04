
beforeEach(() => {
    jest.resetModules();
    process.env.LOG_LEVEL = "0";
});

test("logDebug", async () => {
    const { logDebug } = await import("./logging");

    logDebug("log", "debug", 1);
});

test("logError", async () => {
    const { logError } = await import("./logging");

    logError("log", "error", 4);
});

test("logError with throw", async () => {
    process.env.LOG_THROW_ON_ERROR = "true";
    const { logError } = await import("./logging");

    const action = () => logError("my exception");

    expect(action).toThrowError("my exception");
});
