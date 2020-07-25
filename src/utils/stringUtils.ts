
export function acronym(value?: string, limit?: number | undefined): string {
    if (!value) {
        return "";
    }

    return value
        .split(" ", limit)
        .filter(x => x.length > 0)
        .map(x => x[0])
        .join("");
}
