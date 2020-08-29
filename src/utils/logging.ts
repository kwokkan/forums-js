import { logConfig } from "./config";

const { level, throwOnError } = logConfig;

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
    if (LogLevel.Debug >= level) {
        console.debug(...args);
    }
}

export function logError(...args: any[]) {
    if (LogLevel.Error >= level) {
        console.error(...args);

        if (throwOnError) {
            throw args;
        }
    }
}
