import { GetServerSideProps } from "next";
import { Forum, IProps } from "../../layouts/Forum";
import { forums } from "../../mocks/mockForums";

export default ({ forum }: IProps) => <Forum forum={forum}></Forum>;

export const getServerSideProps: GetServerSideProps = (context) => {
    const { id } = context.params;

    const forum = forums.find(x => x.id == id);

    return Promise.resolve({
        props: {
            forum: forum
        }
    });
}
