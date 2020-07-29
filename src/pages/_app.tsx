import NextApp from 'next/app';
import React from "react";
import { App } from '../layouts/App';
import { Title } from '../layouts/Title';

import "../styles/styles.scss";

class MyApp extends NextApp {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <App title="Forums JS">
                <Title />
                <Component {...pageProps} />
            </App>
        )
    }
}

export default MyApp;
