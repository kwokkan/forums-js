export function formatDate(date: Date | number) {
    if (typeof date === "number") {
        return new Date(date).toISOString();
    }

    return date.toISOString();
}
