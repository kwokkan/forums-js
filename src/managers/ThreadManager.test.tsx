/**
 * @jest-environment jsdom
*/
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { IMessage } from "../types/IMessage";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { setupEnzyme } from "../utils/testUtils";

beforeAll(() => {
    setupEnzyme();
});

test("Renders without error", () => {
    jest.isolateModules(() => {
        const thread: IThread = {
            created: 1,
            id: 2,
            forumId: 1,
            messages: [],
            name: "Test thread"
        };

        const { ThreadManager } = require("./ThreadManager");

        const tree = create(
            <ThreadManager thread={thread} breadcrumbs={[]} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("onNewMessage callback called", (doneCallback) => {
    jest.isolateModules(async () => {
        const user: IUser = {
            id: 3,
            joinedDate: new Date(1900, 1, 1).getTime(),
            name: "Test user"
        };
        const mockAddMessage = jest.fn((): IMessage => ({
            content: "New message",
            created: 1,
            id: 1,
            user: user
        }));

        jest.doMock("../api", () => {
            return {
                __esModule: true,
                addMessage: mockAddMessage
            };
        });

        const thread: IThread = {
            id: 1,
            created: new Date(2020, 1, 1).getTime(),
            forumId: 1,
            name: "Test thread",
            messages: [
                {
                    id: 2,
                    created: new Date(2020, 2, 2).getTime(),
                    content: "First !!!",
                    user: user
                }
            ]
        };

        const { ThreadManager } = require("./ThreadManager");

        const wrapper = mount(
            <ThreadManager thread={thread} breadcrumbs={[]} user={user} />
        );

        act(() => {
            wrapper.find("textarea").simulate("change", { target: { value: "New message" } });
        });

        await act(async () => {
            wrapper.find("button").simulate("click");
        });

        setImmediate(() => {
            expect(mockAddMessage).toBeCalledWith(1, "New message");

            doneCallback();
        });
    });
});
