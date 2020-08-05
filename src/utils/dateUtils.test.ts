import { formatDate } from "./dateUtils";

test("Formats with number", () => {
    const result = formatDate(1580515200000);

    expect(result).toStrictEqual("2020-02-01T00:00:00.000Z");
});

test("Formats with Date", () => {
    const result = formatDate(new Date(2020, 1, 1));

    expect(result).toStrictEqual("2020-02-01T00:00:00.000Z");
});
