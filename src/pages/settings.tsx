import { Fragment } from "react";
import { Settings } from "../layouts/Settings";
import { Title } from "../layouts/Title";

const Page = () =>
    <Fragment>
        <Title title="Settings" />
        <Settings />
    </Fragment>;
export default Page;
