import { IUser } from "./IUser";

export interface IMessage {
    id: number;
    created: number;
    content: string;
    user: IUser;
}
