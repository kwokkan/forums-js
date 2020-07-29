import { GetServerSideProps } from "next";
import { Fragment } from "react";
import { Forums, IProps } from "../layouts/Forums";
import { Title } from "../layouts/Title";
import { forums } from "../mocks/mockForums";

export default ({ forums }: IProps) =>
    <Fragment>
        <Title />
        <Forums forums={forums} />
    </Fragment>;

export const getServerSideProps: GetServerSideProps = () => {
    return Promise.resolve({
        props: {
            forums: forums
        }
    });
}
