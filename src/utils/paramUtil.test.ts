import { parseIntParam } from "./paramUtil";

test("undefined returns undefined", () => {
    const result = parseIntParam();

    expect(result).toEqual(undefined);
});

test("'123' returns 123", () => {
    const result = parseIntParam("123");

    expect(result).toEqual(123);
});

test("'abc' returns undefined", () => {
    const result = parseIntParam("abc");

    expect(result).toEqual(undefined);
});

test("'123abc' returns undefined", () => {
    const result = parseIntParam("123abc");

    expect(result).toEqual(undefined);
});
