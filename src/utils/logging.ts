import { parseIntParam } from "./paramUtil";

const logLevel = parseIntParam(process.env.LOG_LEVEL) ?? 0;

enum LogLevel {
    Trace = 0,
    Debug = 1,
    Information = 2,
    Warning = 3,
    Error = 4,
    Critical = 5,
    None = 6,
}

export function logDebug(...args: any[]) {
    if (logLevel >= LogLevel.Debug) {
        console.debug(...args);
    }
}
