import { create } from "react-test-renderer";
import { About } from "./About";

test("Renders without errors", () => {
    const tree = create(
        <About />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
