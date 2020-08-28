import { getSession } from "next-auth/client";
import { Fragment } from "react";
import { Title } from "../../../layouts/Title";
import { NewThreadManager } from "../../../managers/NewThreadManager";
import { GetTypedServerSideProps } from "../../../types/pageTypes";
import { parseIntParam } from "../../../utils/paramUtil";

interface IProps {
    forumId: number;
}

export const getServerSideProps: GetTypedServerSideProps<{ id: string }, IProps> = async (context) => {
    const forumIdParam = context.params!.id;

    const forumId = parseIntParam(forumIdParam);

    if (forumId === undefined) {
        console.log("Bad forumId: " + forumId);
    }

    const session = await getSession(context);

    if (!session) {
        console.log("Not logged in");
    }

    return {
        props: {
            forumId: forumId!
        }
    };
};

const Page = ({ forumId }: IProps) =>
    <Fragment>
        <Title title="New thread" />
        <NewThreadManager forumId={forumId} />
    </Fragment>;
export default Page;
