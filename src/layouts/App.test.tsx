/**
 * @jest-environment jsdom
*/
import React from "react";
import { create } from "react-test-renderer";
import { IUser } from "../types/IUser";
import { App } from "./App";

test("Renders with custom child", () => {
    const child = <p>Test child</p>;

    const tree = create(
        <App title="Test app">
            {child}
        </App>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with custom child and user", () => {
    const user: IUser = {
        id: 1,
        name: "Test user",
        joinedDate: 1
    };

    const child = <p>Test child</p>;

    const tree = create(
        <App title="Test app" user={user}>
            {child}
        </App>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
