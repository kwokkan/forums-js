/**
 * @jest-environment jsdom
*/
import React from "react";
import { create } from "react-test-renderer";
import { IUser } from "../types/IUser";
import { Navigation } from "./Navigation";

test("Renders with title", () => {
    const tree = create(
        <Navigation title="Test app" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with user", () => {
    const user: IUser = {
        id: 1,
        name: "Test user",
        joinedDate: 1
    };

    const tree = create(
        <Navigation title="Test app" user={user} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
