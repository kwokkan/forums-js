import { SessionContextValue } from "next-auth/react";
import { create } from "react-test-renderer";

test("Renders without user", () => {
    jest.isolateModules(() => {
        const mockSession = jest.fn((): SessionContextValue => ({ data: null, status: "unauthenticated" }));

        jest.doMock("next-auth/react", () => {
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
        const mockSession = jest.fn((): SessionContextValue => ({
            data: {
                forumsUser: {
                    id: 1,
                    name: "Test user",
                    joinedDate: 1
                }
            },
            status: "authenticated"
        }));

        jest.doMock("next-auth/react", () => {
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
