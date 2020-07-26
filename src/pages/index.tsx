import { GetServerSideProps } from "next";
import { Forums, IProps } from "../layouts/Forums";
import { forums } from "../mocks/mockForums";

export default ({ forums }: IProps) => <Forums forums={forums}></Forums>;

export const getServerSideProps: GetServerSideProps = () => {
    return Promise.resolve({
        props: {
            forums: forums
        }
    });
}
