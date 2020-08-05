import { Fragment } from "react";
import { Forums, IProps } from "../layouts/Forums";
import { Title } from "../layouts/Title";
import { getForums } from "../services/forumService";
import { GetTypedServerSideProps } from "../types/pageTypes";

export const getServerSideProps: GetTypedServerSideProps<{}> = async () => {
    const forums = await getForums();

    return {
        props: {
            forums: forums
        }
    };
}

const Page = ({ forums }: IProps) =>
    <Fragment>
        <Title />
        <Forums forums={forums} />
    </Fragment>;
export default Page;
