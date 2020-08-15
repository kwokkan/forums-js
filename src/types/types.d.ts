
interface IForumSessionUser {
    id: number;
    name: string;
    joinedDate: number;
}

interface INextSession extends any {
    forumsUser?: IForumSessionUser;
}

declare module "next-auth" {
    interface INextAccount extends any {
        provider: string;
        id: string;
    }

    export interface IProviderOptions {
        providers: any[],
        callbacks?: IProviderOptionsCallback
    }

    interface IProviderOptionsCallback {
        signIn?: (user: INextUser, account: INextAccount, profile: INextProfile) => Promise<bool>;
        redirect?: (url: string, baseUrl: string) => Promise<string>;
        session?: (session: INextSession, user: INextUser, sessionToken: string) => Promise<INextSession>;
        jwt?: (token: INextToken, user: INextUser, account: INextAccount, profile: INextProfile, isNewUser: boolean) => Promise<INextToken>;
    }

    interface INextProfile extends any {
    }

    interface INextToken extends any {
        forumsUser?: IForumSessionUser;
    }

    interface INextUser extends any {
        name: string;
        forumsUser?: IForumSessionUser;
    }

    function handler(req: IncomingMessage, res: ServerResponse, options: IProviderOptions): void;

    export = handler;
}

declare module "next-auth/client" {
    export const Provider: any;

    export function getSession<T>(context: GetServerSidePropsContext<T>): Promise<INextClientSession>;

    export function signIn(): void;

    export function signOut(): void;

    export function useSession(): [INextSession, bool];
}

declare module "next-auth/providers" {
    interface IProviderConfig {
        clientId: string,
        clientSecret?: string,
        scope?: string[] | string
    }

    export = {
        GitHub: (config: IProviderConfig) => any
    };
}
