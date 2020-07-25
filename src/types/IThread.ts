import { IMessage } from "./IMessage";

export interface IThread {
    id: number;
    created: Date;
    name: string;
    messages: IMessage[];
}
