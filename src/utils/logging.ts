import { parseIntParam } from "./paramUtil";

const logLevel = parseIntParam(process.env.LOG_LEVEL) ?? 0;
const throwOnError = process.env.LOG_THROW_ON_ERROR === "true";

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
    if (LogLevel.Debug >= logLevel) {
        console.debug(...args);
    }
}

export function logError(...args: any[]) {
    if (LogLevel.Error >= logLevel) {
        console.error(...args);

        if (throwOnError) {
            throw args;
        }
    }
}
