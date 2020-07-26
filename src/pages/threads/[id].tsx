import { GetServerSideProps } from "next";
import { IProps, Thread } from "../../layouts/Thread";
import { forums } from "../../mocks/mockForums";

export default ({ thread }: IProps) => <Thread thread={thread}></Thread>;

export const getServerSideProps: GetServerSideProps = (context) => {
    const { id } = context.params;

    const thread = forums.filter(x => x.threads).flatMap(x => x.threads!).find(x => x.id == id);

    return Promise.resolve({
        props: {
            thread: thread
        }
    });
}
