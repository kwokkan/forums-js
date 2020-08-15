import { create } from "react-test-renderer";

test("Renders without user", () => {
    jest.isolateModules(() => {
        const mockSession = jest.fn((): [INextSession | null, boolean] => [null, true]);

        jest.doMock("next-auth/client", () => {
            return {
                __esModule: true,
                useSession: mockSession
            };
        });

        const { Settings } = require("./Settings");

        const tree = create(
            <Settings />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("Renders with user", () => {
    jest.isolateModules(() => {
        const mockSession = jest.fn((): [INextSession | null, boolean] => [{
            forumsUser: {
                id: 1,
                name: "Test user",
                joinedDate: 1
            }
        }, true]);

        jest.doMock("next-auth/client", () => {
            return {
                __esModule: true,
                useSession: mockSession
            };
        });

        const { Settings } = require("./Settings");

        const tree = create(
            <Settings />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
