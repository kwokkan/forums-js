/**
 * @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { create } from "react-test-renderer";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { Thread } from "./Thread";

test("Renders with no messages", () => {
    const thread: IThread = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "Test thread",
        messages: []
    };

    const tree = create(
        <Thread thread={thread} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with messages", () => {
    const thread: IThread = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "Test thread",
        messages: [
            {
                id: 2,
                created: new Date(2020, 2, 2).getTime(),
                content: "First !!!",
                user: {
                    id: 3,
                    joinedDate: new Date(1900, 1, 1).getTime(),
                    name: "Test user"
                }
            }
        ]
    };

    const tree = create(
        <Thread thread={thread} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with new message box", () => {
    const thread: IThread = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "Test thread",
        messages: [
            {
                id: 2,
                created: new Date(2020, 2, 2).getTime(),
                content: "First !!!",
                user: {
                    id: 3,
                    joinedDate: new Date(1900, 1, 1).getTime(),
                    name: "Test user"
                }
            }
        ]
    };

    const user: IUser = {
        id: 1,
        joinedDate: 2,
        name: "Test user"
    };

    const tree = create(
        <Thread thread={thread} user={user} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("onNewMessage callback called", async () => {
    const mockOnAddNewMessage = jest.fn();
    const thread: IThread = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "Test thread",
        messages: [
            {
                id: 2,
                created: new Date(2020, 2, 2).getTime(),
                content: "First !!!",
                user: {
                    id: 3,
                    joinedDate: new Date(1900, 1, 1).getTime(),
                    name: "Test user"
                }
            }
        ]
    };

    const user: IUser = {
        id: 1,
        joinedDate: 2,
        name: "Test user"
    };

    render(
        <Thread thread={thread} user={user} onNewMessage={mockOnAddNewMessage} />
    );

    userEvent.type(screen.getByRole("textbox"), "New message");

    userEvent.click(screen.getByText("Submit"));

    expect(mockOnAddNewMessage).toBeCalledWith(1, "New message");
});
