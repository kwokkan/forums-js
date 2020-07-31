import React from "react";
import { create } from "react-test-renderer";
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
