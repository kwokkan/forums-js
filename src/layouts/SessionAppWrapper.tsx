import { useSession } from "next-auth/client";
import { App } from "./App";
import { Title } from "./Title";

interface IProps {
    Component: any;
    pageProps?: any;
}

export function SessionAppWrapper({ Component, pageProps }: IProps) {
    const [session] = useSession();

    return (
        <App title="Forums JS" user={session?.forumsUser}>
            <Title />
            <Component {...pageProps} />
        </App>
    );
}
