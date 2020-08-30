import { create } from "react-test-renderer";
import { Markdown } from "./Markdown";

test("Renders without errors", () => {
    const content = [
        "# header",
        "## sub header",
        "<script>alert(1)</script>",
        "<b>bold</b>",
        "[my link](http://localhost:3000)",
        "normal content"
    ];
    const tree = create(
        <Markdown content={content.join("\n\n")} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
