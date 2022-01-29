/**
 * @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { IThread } from "../types/IThread";

test("Renders without error", () => {
    jest.isolateModules(() => {
    const { NewThreadManager } = require("./NewThreadManager");

        const tree = renderer.create(
            <NewThreadManager forumId={10} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("onNewThread callback called", (doneCallback) => {
    jest.isolateModules(async () => {
        const mockAddThread = jest.fn((): IThread => ({
            created: 1,
            id: 20,
            messages: [],
            name: "New title"
        }));
        const mockPush = jest.fn();

        jest.doMock("../api", () => {
            return {
                __esModule: true,
                addThread: mockAddThread
            };
        });

        jest.doMock("next/router", () => {
            return {
                __esModule: true,
                useRouter: () => ({
                    push: mockPush
                })
            };
        });

        const { NewThreadManager } = await import("./NewThreadManager");

        render(
            <NewThreadManager forumId={10} />
        );

        userEvent.type(screen.getByLabelText("Title"), "New title");
        userEvent.type(screen.getByLabelText("Message"), "New message");

        userEvent.click(screen.getByRole("button"));

        setImmediate(() => {
            expect(mockAddThread).toBeCalledWith({ forumId: 10, title: "New title", message: "New message" });
            expect(mockPush).toBeCalledWith("/threads/[id]", "/threads/20");

            doneCallback();
        });
    });
});
