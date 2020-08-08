import { getSession } from "next-auth/client";
import { Fragment } from "react";
import { Settings } from "../layouts/Settings";
import { Title } from "../layouts/Title";
import { GetTypedServerSideProps } from "../types/pageTypes";

export const getServerSideProps: GetTypedServerSideProps<{}> = async (context) => {
    const session = await getSession(context);

    return {
        props: { session }
    }
};

const Page = () =>
    <Fragment>
        <Title title="Settings" />
        <Settings />
    </Fragment>;
export default Page;
