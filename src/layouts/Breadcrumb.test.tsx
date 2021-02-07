/**
 * @jest-environment jsdom
*/
import { create } from "react-test-renderer";
import { IBreadcrumb } from "../types/IBreadcrumb";
import { Breadcrumb } from "./Breadcrumb";

test("Renders with breadcrumbs", () => {
    const breadcrumbs: IBreadcrumb[] = [
        {
            title: "First",
            url: "/urls/1"
        },
        {
            title: "Second",
            url: "/urls/2"
        }
    ];

    const tree = create(
        <Breadcrumb breadcrumbs={breadcrumbs} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
