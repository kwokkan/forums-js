/**
 * @jest-environment jsdom
 */
import React from "react";
import { create } from "react-test-renderer";

function TestChild() {
    return (
        <p>Test</p>
    );
}

test("Renders without session", () => {
    jest.isolateModules(() => {
        const mockSession = jest.fn((): [INextSession | null, boolean] => [null, true]);

        jest.doMock("next-auth/client", () => {
            return {
                __esModule: true,
                useSession: mockSession
            };
        });

        const { SessionAppWrapper } = require("./SessionAppWrapper");

        const tree = create(
            <SessionAppWrapper Component={TestChild} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("Renders with session", () => {
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

        const { SessionAppWrapper } = require("./SessionAppWrapper");

        const tree = create(
            <SessionAppWrapper Component={TestChild} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
