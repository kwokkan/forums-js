
beforeEach(() => {
    jest.resetModules();
});

test("Runs query without args", async () => {
    const mockQuery = jest.fn(() => []);

    jest.doMock("./pool", () => {
        return {
            __esModule: true,
            pool: {
                query: mockQuery
            }
        };
    });

    const common = await import("./common");

    await common.runQuery<number>("select 1");

    expect(mockQuery).toBeCalledWith("select 1", undefined);
});

test("Runs query with args", async () => {
    const mockQuery = jest.fn(() => []);

    jest.doMock("./pool", () => {
        return {
            __esModule: true,
            pool: {
                query: mockQuery
            }
        };
    });

    const common = await import("./common");

    await common.runQuery<number>("select 1", [1, 2]);

    expect(mockQuery).toBeCalledWith("select 1", expect.arrayContaining([1, 2]));
});

test("Exception returns empty array", async () => {
    const mockQuery = jest.fn(() => { throw new Error("test fail"); });

    jest.doMock("./pool", () => {
        return {
            __esModule: true,
            pool: {
                query: mockQuery
            }
        };
    });

    const common = await import("./common");

    const result = await common.runQuery<number>("select 1");

    expect(result).toStrictEqual([]);
});
