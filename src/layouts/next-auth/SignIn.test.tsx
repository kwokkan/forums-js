import { create } from "react-test-renderer";
import { ProviderType, SignIn } from "./SignIn";

test("Renders without error", () => {
    const providers: ProviderType = {
        github: {
            id: "github",
            name: "GitHub"
        }
    };

    const tree = create(
        <SignIn providers={providers} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
