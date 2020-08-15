
describe("logging", () => {
    const oldEnv = process.env.NODE_ENV;

    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        process.env.NODE_ENV = oldEnv;
    });

    test("logDebug with args - development", () => {
        process.env.NODE_ENV = "development";

        const { logDebug } = require("./logging");

        logDebug("hello", 1, { id: 3 });
    });

    test("logDebug with args - production", () => {
        process.env.NODE_ENV = "production";

        const { logDebug } = require("./logging");

        logDebug("hello", 1, { id: 3 });
    });
});
