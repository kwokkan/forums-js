import React from "react";
import { create } from "react-test-renderer";
import { IForum } from "../types/IForum";
import { IUser } from "../types/IUser";
import { Forum } from "./Forum";

test("Renders with nothing", () => {
    const forum: IForum = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "First forum"
    };

    const tree = create(
        <Forum forum={forum} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with description", () => {
    const forum: IForum = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "First forum",
        description: "Forum description."
    };

    const tree = create(
        <Forum forum={forum} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with new thread button", () => {
    const forum: IForum = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "First forum",
        description: "Forum description."
    };

    const user: IUser = {
        id: 1,
        joinedDate: 2,
        name: "Test user"
    };

    const tree = create(
        <Forum forum={forum} user={user} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

/*
test("Renders with threads", () => {
    const forum: IForum = {
        id: 1,
        created: new Date(2020, 1, 1).getTime(),
        name: "First forum",
        threads: [
            {
                id: 2,
                created: new Date(2020, 2, 2).getTime(),
                name: "First thread",
                messages: []
            }
        ]
    };

    const tree = create(
        <Forum forum={forum} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
*/
