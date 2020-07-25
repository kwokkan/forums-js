import { IForum } from "../types/IForum";

const created = new Date();
let forumId = 1;
let threadId = 1;

export const forums: IForum[] = [
    {
        id: forumId++,
        created: created,
        name: "Site",
        description: "Site related posts.",
        threads: [
            {
                id: threadId++,
                created: created,
                name: "Rules"
            },
            {
                id: threadId++,
                created: created,
                name: "Help & troubleshooting"
            },
            {
                id: threadId++,
                created: created,
                name: "Release - v1.0.0-alpha.1"
            }
        ]
    },
    {
        id: forumId++,
        created: created,
        name: "General",
        description: "General discussions.",
        threads: [
            {
                id: threadId++,
                created: created,
                name: "Welcome thread"
            }
        ]
    },
    {
        id: forumId++,
        created: created,
        name: "Misc"
    },
    {
        id: forumId++,
        created: created,
        name: "Trash",
        description: "Deleted posts."
    }
];
