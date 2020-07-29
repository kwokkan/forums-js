import { Forum, IProps } from "../../layouts/Forum";
import { forums } from "../../mocks/mockForums";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export default ({ forum }: IProps) => <Forum forum={forum}></Forum>;

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = (context) => {
    const id = parseIntParam(context.params?.id);

    const forum = forums.find(x => x.id == id);

    return Promise.resolve({
        props: {
            forum: forum
        }
    });
}
