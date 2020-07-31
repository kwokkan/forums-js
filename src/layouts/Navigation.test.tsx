import React from "react";
import { create } from "react-test-renderer";
import { Navigation } from "./Navigation";

test("Renders with title", () => {
    const tree = create(
        <Navigation title="Test app" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
