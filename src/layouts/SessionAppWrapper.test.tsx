/**
 * @jest-environment jsdom
 */
import { SessionContextValue } from "next-auth/react";
import React from "react";
import { create } from "react-test-renderer";

function TestChild() {
    return (
        <p>Test</p>
    );
}

test("Renders without session", () => {
    jest.isolateModules(() => {
        const mockSession = jest.fn((): SessionContextValue => ({ data: null, status: "unauthenticated" }));

        jest.doMock("next-auth/react", () => {
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

        const { SessionAppWrapper } = require("./SessionAppWrapper");

        const tree = create(
            <SessionAppWrapper Component={TestChild} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
