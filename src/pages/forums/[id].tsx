import { Fragment } from "react";
import { Forum, IProps } from "../../layouts/Forum";
import { Title } from "../../layouts/Title";
import { getForumById } from "../../services/forumService";
import { GetTypedServerSideProps } from "../../types/pageTypes";
import { parseIntParam } from "../../utils/paramUtil";

export default ({ forum }: IProps) =>
    <Fragment>
        <Title title={forum.name} />
        <Forum forum={forum} />
    </Fragment>;

export const getServerSideProps: GetTypedServerSideProps<{ id: string }> = async (context) => {
    const id = parseIntParam(context.params?.id);

    const forum = await getForumById(id);

    return {
        props: {
            forum: forum
        }
    };
}
