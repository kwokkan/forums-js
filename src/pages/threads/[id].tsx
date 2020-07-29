import { IProps, Thread } from "../../layouts/Thread";
import { forums } from "../../mocks/mockForums";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export default ({ thread }: IProps) => <Thread thread={thread}></Thread>;

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = (context) => {
    const id = parseIntParam(context.params?.id);

    const thread = forums.filter(x => x.threads).flatMap(x => x.threads!).find(x => x.id == id);

    return Promise.resolve({
        props: {
            thread: thread
        }
    });
}
