import React from "react";
import { create } from "react-test-renderer";
import { IThread } from "../types/IThread";
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
