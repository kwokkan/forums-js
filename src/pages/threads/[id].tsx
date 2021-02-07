import { getSession } from "next-auth/client";
import { Fragment } from "react";
import { IProps } from "../../layouts/Thread";
import { Title } from "../../layouts/Title";
import { ThreadManager } from "../../managers/ThreadManager";
import { getBreadcrumbsByThreadId } from "../../services/breadcrumbService";
import { getThreadById } from "../../services/threadService";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = async (context) => {
    const session = await getSession(context);

    const id = parseIntParam(context.params?.id);

    const thread = await getThreadById(id);

    const breadcrumbs = await getBreadcrumbsByThreadId(thread!.id);

    return {
        props: {
            thread: thread,
            breadcrumbs: breadcrumbs,
            user: session?.forumsUser || null
        }
    };
};

const Page = ({ thread, breadcrumbs, user }: IProps) =>
    <Fragment>
        <Title title={thread.name} />
        <ThreadManager thread={thread} breadcrumbs={breadcrumbs} user={user} />
    </Fragment>;
export default Page;
