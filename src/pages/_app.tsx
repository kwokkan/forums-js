import { getSession, SessionProvider } from "next-auth/react";
import React from "react";
import { SessionAppWrapper } from "../layouts/SessionAppWrapper";
import { GetTypedServerSideProps } from '../types/pageTypes';

import "../styles/styles.scss";

export const getServerSideProps: GetTypedServerSideProps<{}> = async (context) => {
    const session = await getSession(context);

    return {
        props: {
            session: session
        }
    };
};

function MyApp({ Component, pageProps }: any) {
    return (
        <SessionProvider session={pageProps.session}>
            <SessionAppWrapper Component={Component} pageProps={pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
