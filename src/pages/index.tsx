import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { Forums, IProps } from "../layouts/Forums";
import { Title } from "../layouts/Title";
import { getForums } from "../services/forumService";

export default ({ forums }: IProps) =>
    <Fragment>
        <Title />
        <Forums forums={forums} />
    </Fragment>;

export const getServerSideProps: GetServerSideProps = async () => {
    const forums = await getForums();

    return {
        props: {
            forums: forums
        }
    };
}
