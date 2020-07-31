import React from "react";
import { create } from "react-test-renderer";
import { Title } from "./Title";

test("Renders without props", () => {
    const tree = create(
        <Title />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders with title", () => {
    const tree = create(
        <Title title="From test" />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
