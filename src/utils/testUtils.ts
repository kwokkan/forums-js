import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

export function setupEnzyme() {
    Enzyme.configure({ adapter: new Adapter() });
}
