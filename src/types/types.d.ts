import { Session } from "next-auth";

interface IForumSessionUser {
    id: number;
    name: string;
    joinedDate: number;
}

interface INextSession extends Session {
    forumsUser?: IForumSessionUser;
}

interface INextProvider extends any {
    id: string;
    name: string;
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        forumsUser?: IForumSessionUser;
    }

    interface User {
        forumsUser?: IForumSessionUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        forumsUser?: IForumSessionUser;
    }
}
