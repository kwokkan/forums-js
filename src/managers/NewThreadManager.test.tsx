import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { IThread } from "../types/IThread";

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

test("onNewThread callback called", (doneCallback) => {
    jest.isolateModules(async () => {
        const mockAddThread = jest.fn((): IThread => ({
            created: 1,
            id: 20,
            messages: [],
            name: "New title"
        }));
        const mockPush = jest.fn();

        jest.doMock("../api", () => {
            return {
                __esModule: true,
                addThread: mockAddThread
            };
        });

        jest.doMock("next/router", () => {
            return {
                __esModule: true,
                useRouter: () => ({
                    push: mockPush
                })
            };
        });

        const { NewThreadManager } = await import("./NewThreadManager");

        let wrapper = mount(
            <NewThreadManager forumId={10} />
        );

        act(() => {
            wrapper.find('input[name="title"]').simulate("change", { target: { value: "New title" } });
            wrapper.find('textarea[name="message"]').simulate("change", { target: { value: "New message" } });
        });

        await act(async () => {
            wrapper.find("button").simulate("click");
        });

        setImmediate(() => {
            expect(mockAddThread).toBeCalledWith({ forumId: 10, title: "New title", message: "New message" });
            expect(mockPush).toBeCalledWith("/threads/[id]", "/threads/20");

            doneCallback();
        });
    });
});
