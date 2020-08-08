declare module "next-auth" {
    function handler(req: IncomingMessage, res: ServerResponse, options: any) {
    }

    export = handler;
}

declare module "next-auth/client" {
    interface Session {
    }

    export function getSession<T>(context: GetServerSidePropsContext<T>): Promise<Session> {
    }

    export function useSession(): Promise {
    }
}

declare module "next-auth/providers" {
    export = {
        GitHub: (config: any): any => { }
    };
}
