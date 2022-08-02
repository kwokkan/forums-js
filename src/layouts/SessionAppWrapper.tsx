import { useSession } from "next-auth/react";
import { App } from "./App";
import { Title } from "./Title";

interface IProps {
    Component: any;
    pageProps?: any;
}

export function SessionAppWrapper({ Component, pageProps }: IProps) {
    const { data: session } = useSession();

    return (
        <App title="Forums JS" user={session?.forumsUser}>
            <Title />
            <Component {...pageProps} />
        </App>
    );
}
