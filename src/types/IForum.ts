import { IThread } from "./IThread";

export interface IForum {
    id: number;
    created: Date;
    name: string;
    description?: string;
    threads?: IThread[];
}
