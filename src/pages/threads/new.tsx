import { getSession } from "next-auth/client";
import { Fragment } from "react";
import { Title } from "../../layouts/Title";
import { NewThreadManager } from "../../managers/NewThreadManager";
import { GetTypedServerSideProps } from "../../types/pageTypes";

export const getServerSideProps: GetTypedServerSideProps<{}> = async (context) => {
    const session = await getSession(context);

    return {
        props: {
            user: session?.forumsUser || null
        }
    };
};

const Page = () =>
    <Fragment>
        <Title title="New thread" />
        <NewThreadManager />
    </Fragment>;
export default Page;
