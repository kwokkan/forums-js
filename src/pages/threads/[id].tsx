import { Fragment } from "react";
import { IProps, Thread } from "../../layouts/Thread";
import { Title } from "../../layouts/Title";
import { forums } from "../../mocks/mockForums";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export default ({ thread }: IProps) =>
    <Fragment>
        <Title title={thread.name} />
        <Thread thread={thread} />
    </Fragment>;

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = (context) => {
    const id = parseIntParam(context.params?.id);

    const thread = forums.filter(x => x.threads).flatMap(x => x.threads!).find(x => x.id == id);

    return Promise.resolve({
        props: {
            thread: thread
        }
    });
}
