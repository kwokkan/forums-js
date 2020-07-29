import { IThread } from "./IThread";

export interface IForum {
    id: number;
    created: number;
    name: string;
    description?: string;
    threads?: IThread[];
}
