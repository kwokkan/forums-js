import { getProviders } from "next-auth/react";
import { SignIn } from "../../layouts/next-auth/SignIn";
import { Title } from "../../layouts/Title";
import { GetTypedServerSideProps } from "../../types/pageTypes";

export const getServerSideProps: GetTypedServerSideProps<{}> = async (context) => {
    const providers = await getProviders();

    return {
        props: {
            providers: providers,
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
