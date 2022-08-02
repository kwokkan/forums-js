import GitHubProvider from "next-auth/providers/github";
import { SignIn } from "../../layouts/next-auth/SignIn";
import { Title } from "../../layouts/Title";
import { GetTypedServerSideProps } from "../../types/pageTypes";

export const getServerSideProps: GetTypedServerSideProps<{}> = async (context) => {
    const providersObj = {
        GitHub: GitHubProvider
    };

    return {
        props: {
            providers: providersObj,
            callbackUrl: context.query?.callbackUrl || ""
        }
    };
};

const Page = ({ providers, callbackUrl }: any) =>
    <>
        <Title title="Sign in" />
        <SignIn providers={providers} callbackUrl={callbackUrl} />
    </>;
export default Page;
