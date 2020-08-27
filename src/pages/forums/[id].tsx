import { getSession } from "next-auth/client";
import { Fragment } from "react";
import { Forum, IProps } from "../../layouts/Forum";
import { Title } from "../../layouts/Title";
import { getForumById } from "../../services/forumService";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = async (context) => {
    const session = await getSession(context);

    const id = parseIntParam(context.params?.id);

    const forum = await getForumById(id);

    return {
        props: {
            forum: forum,
            user: session?.forumsUser || null
        }
    };
};

const Page = ({ forum, user }: IProps) =>
    <Fragment>
        <Title title={forum.name} />
        <Forum forum={forum} user={user} />
    </Fragment>;
export default Page;
