import { signIn } from "next-auth/react";
import { Button, Content, Panel } from "rsuite";
import { INextProvider } from "../../types/types";

export type ProviderType = Record<string, INextProvider>;

interface IProps {
    providers: ProviderType;
    callbackUrl?: string;
}

export function SignIn(props: IProps) {
    return (
        <>
            {Object.values(props.providers).map(x =>
                <Panel key={x.id} header={
                    <h3>
                        {x.name}
                    </h3>
                }>
                    <Content>
                        <Button appearance="primary" onClick={() => signIn(x.id, { callbackUrl: props.callbackUrl })}>Sign in with {x.name}</Button>
                    </Content>
                </Panel>
            )}
        </>
    );
}
