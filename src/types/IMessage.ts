import { IUser } from "./IUser";

export interface IMessage {
    id: number;
    created: Date;
    content: string;
    user: IUser;
}
