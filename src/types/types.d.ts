
interface IForumSessionUser {
    id: number;
    name: string;
    joinedDate: number;
}

interface INextSession extends any {
    forumsUser?: IForumSessionUser;
}

interface INextProvider extends any {
    id: string;
    name: string;
}

declare module "next-auth" {
    interface INextAccount extends any {
        provider: string;
        id: string;
    }

    export interface IProviderOptions {
        providers: any[];
        callbacks?: IProviderOptionsCallback;
        events?: INextEventsOptions;
        pages?: INextPageOptions;
        debug?: boolean;
    }

    interface IProviderOptionsCallback {
        signIn?: (user: INextUser, account: INextAccount, profile: INextProfile) => Promise<bool>;
        redirect?: (url: string, baseUrl: string) => Promise<string>;
        session?: (session: INextSession, user: INextUser, sessionToken: string) => Promise<INextSession>;
        jwt?: (token: INextToken, user: INextUser, account: INextAccount, profile: INextProfile, isNewUser: boolean) => Promise<INextToken>;
    }

    interface INextEventsOptions {
        signIn?: (message: any) => Promise;
        signOut?: (message: any) => Promise;
        createUser?: (message: any) => Promise;
        linkAccount?: (message: any) => Promise;
        session?: (message: any) => Promise;
        error?: (message: any) => Promise;
    }

    interface INextPageOptions {
        signIn?: string;
        signOut?: string;
        error?: string;
        verifyRequest?: string;
        newUser?: string;
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

    export function getSession(context: { req: IncomingMessage }): Promise<INextSession>;

    export function providers<T>(context: GetServerSidePropsContext<T>): Promise<INextProvider[]>;

    export function signIn(provider?: string, args?: { callbackUrl?: string }): void;

    export function signOut(): void;

    export function useSession(): [INextSession | null, boolean];
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
