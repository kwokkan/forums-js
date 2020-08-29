import { logDebug, logError } from "./logging";

test("logDebug", () => {
    logDebug("log", "debug", 1);
});

test("logError", () => {
    logError("log", "error", 4);
});
