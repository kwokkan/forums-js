import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { Thread } from "./Thread";

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

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

    let wrapper = mount(
        <Thread thread={thread} user={user} onNewMessage={mockOnAddNewMessage} />
    );

    act(() => {
        wrapper.find("textarea").simulate("change", { target: { value: "New message" } });
    });

    await act(async () => {
        wrapper.find("button").simulate("click");
    })

    expect(mockOnAddNewMessage).toBeCalledWith(1, "New message");
});
