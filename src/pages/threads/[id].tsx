import { Fragment } from "react";
import { IProps, Thread } from "../../layouts/Thread";
import { Title } from "../../layouts/Title";
import { getThreadById } from "../../services/threadService";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export default ({ thread }: IProps) =>
    <Fragment>
        <Title title={thread.name} />
        <Thread thread={thread} />
    </Fragment>;

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = async (context) => {
    const id = parseIntParam(context.params?.id);

    const thread = await getThreadById(id);

    return {
        props: {
            thread: thread
        }
    };
}
