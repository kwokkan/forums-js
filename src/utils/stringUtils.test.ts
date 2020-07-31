import { acronym } from "./stringUtils";

test("undefined returns empty string", () => {
    const result = acronym();

    expect(result).toEqual("");
});

test("Empty string returns empty string", () => {
    const result = acronym("");

    expect(result).toEqual("");
});

test("'This is a test' returns 'Ti' with limit 2", () => {
    const result = acronym("This is a test", 2);

    expect(result).toEqual("Ti");
});

test("'This is a test' returns 'Tiat' with limit 4", () => {
    const result = acronym("This is a test", 4);

    expect(result).toEqual("Tiat");
});

test("'This is a test' returns 'Tiat' with limit 6", () => {
    const result = acronym("This is a test", 6);

    expect(result).toEqual("Tiat");
});
