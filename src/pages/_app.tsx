import { getSession, Provider } from "next-auth/client";
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
        <Provider session={pageProps.session}>
            <SessionAppWrapper Component={Component} pageProps={pageProps} />
        </Provider>
    );
}

export default MyApp;
