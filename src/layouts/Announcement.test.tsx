import React from "react";
import { create } from "react-test-renderer";
import { Announcement } from "./Announcement";

test("Renders with message", () => {
    const tree = create(
        <Announcement title="Testing" message="Rendered in test." />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
