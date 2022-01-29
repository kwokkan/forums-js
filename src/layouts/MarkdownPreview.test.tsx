/**
 * @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { create } from "react-test-renderer";
import { MarkdownPreview } from "./MarkdownPreview";

test("Renders without error - edit mode", () => {
    const content = "# header";
    const tree = create(
        <MarkdownPreview content={content} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders without error - preview mode", () => {
    const content = "# header";
    render(
        <MarkdownPreview content={content} />
    );

    userEvent.click(screen.getByText("Preview"));

    expect(screen.getByRole("heading", { level: 1 }));
});
