import React from "react";
import { create } from "react-test-renderer";
import { IForum } from "../types/IForum";
import { Forums } from "./Forums";

test("Renders with no forums", () => {
    const forums: IForum[] = [];

    const tree = create(
        <Forums forums={forums} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with multiple forums", () => {
    const created = new Date(2020, 1, 1).getTime();
    const forums: IForum[] = [
        {
            id: 1,
            created: created,
            name: "First forum"
        },
        {
            id: 2,
            created: created,
            name: "Second forum"
        }
    ];

    const tree = create(
        <Forums forums={forums} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with description", () => {
    const created = new Date(2020, 1, 1).getTime();
    const forums: IForum[] = [
        {
            id: 1,
            created: created,
            name: "First forum",
            description: "Forum description."
        }
    ];

    const tree = create(
        <Forums forums={forums} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
