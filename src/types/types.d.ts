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