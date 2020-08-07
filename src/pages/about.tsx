import { Fragment } from "react";
import { About } from "../layouts/About";
import { Title } from "../layouts/Title";

const Page = () =>
    <Fragment>
        <Title title="About" />
        <About />
    </Fragment>;
export default Page;
