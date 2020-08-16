const isDev = process.env.NODE_ENV === "development";

export function logDebug(...args: any[]) {
    if (isDev) {
        console.debug(...args);
    }
}
