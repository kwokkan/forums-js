import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { NewThread } from "./NewThread";

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test("Renders without error", () => {
    const tree = create(
        <NewThread />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("onNewThread callback called", async () => {
    const mockOnNewThread = jest.fn();

    const wrapper = mount(
        <NewThread onNewThread={mockOnNewThread} />
    );

    act(() => {
        wrapper.find('input[name="title"]').simulate("change", { target: { value: "New title" } });
        wrapper.find('textarea[name="message"]').simulate("change", { target: { value: "New message" } });
    });

    await act(async () => {
        wrapper.find("button").simulate("click");
    })

    expect(mockOnNewThread).toBeCalledWith("New title", "New message");
});
