import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { MarkdownPreview } from "./MarkdownPreview";

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

test("Renders without error - edit mode", () => {
    const content = "# header";
    const tree = create(
        <MarkdownPreview content={content} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test("Renders without error - preview mode", () => {
    const content = "# header";
    let wrapper = mount(
        <MarkdownPreview content={content} />
    );

    act(() => {
        wrapper.find("li.preview-strip-2 a").simulate("click");
    });

    wrapper = wrapper.update();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(".preview-strip-2 .rs-nav-item-active").length).toStrictEqual(1);
});
