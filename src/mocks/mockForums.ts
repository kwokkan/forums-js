import { IForum } from "../types/IForum";

export const forums: IForum[] = [
    {
        id: 1,
        created: new Date(),
        name: "Announcements",
        description: "Announcements about site."
    },
    {
        id: 2,
        created: new Date(),
        name: "General",
        description: "General discussions."
    },
    {
        id: 3,
        created: new Date(),
        name: "Site",
        description: "Site issues and help."
    },
    {
        id: 4,
        created: new Date(),
        name: "Misc"
    },
    {
        id: 5,
        created: new Date(),
        name: "Trash",
        description: "Deleted posts."
    }
];
