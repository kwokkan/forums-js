import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test("Renders without error", () => {
    jest.isolateModules(() => {
        const { NewThreadManager } = require("./NewThreadManager");

        const tree = create(
            <NewThreadManager />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
/*
test("onNewThread callback called", (doneCallback) => {
    jest.isolateModules(async () => {
        const mockOnNewThread = jest.fn();

        jest.doMock("../api", () => {
            return {
                __esModule: true,
                addMessage: mockOnNewThread
            };
        });

        const { NewThreadManager } = await import("./NewThreadManager");

        let wrapper = mount(
            <NewThreadManager />
        );

        act(() => {
            wrapper.find('input[name="title"]').simulate("change", { target: { value: "New title" } });
            wrapper.find('textarea[name="message"]').simulate("change", { target: { value: "New message" } });
        });

        await act(async () => {
            wrapper.find("button").simulate("click");
        });

        setImmediate(() => {
            expect(mockOnNewThread).toBeCalledWith("New title", "New message");

            doneCallback();
        });
    });
});
*/