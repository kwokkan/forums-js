/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { create } from "react-test-renderer";
import { NewThread } from "./NewThread";

test("Renders without error", () => {
    const tree = create(
        <NewThread />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("onNewThread callback called", async () => {
    const mockOnNewThread = jest.fn();

    render(
        <NewThread onNewThread={mockOnNewThread} />
    );

    userEvent.type(screen.getByLabelText("Title"), "New title");
    userEvent.type(screen.getByLabelText("Message"), "New message");

    userEvent.click(screen.getByRole("button"));

    expect(mockOnNewThread).toBeCalledWith("New title", "New message");
});
