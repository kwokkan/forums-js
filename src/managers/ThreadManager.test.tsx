import { create } from "react-test-renderer";
import { IThread } from "../types/IThread";
import { ThreadManager } from "./ThreadManager";

test("Renders without error", () => {
    const thread: IThread = {
        created: 1,
        id: 2,
        messages: [],
        name: "Test thread"
    };

    const tree = create(
        <ThreadManager thread={thread} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
