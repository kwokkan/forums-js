import { IMessage } from "./IMessage";

export interface IThread {
    id: number;
    created: number;
    name: string;
    messages: IMessage[];
}
