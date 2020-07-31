import { IForum } from "../types/IForum";
import { IUser } from "../types/IUser";

let forumId = 1;
let threadId = 1;
let messageId = 1;
let userId = 1;

const created = new Date().getTime();
const user: IUser = {
    id: userId++,
    joinedDate: created,
    name: "Admin"
};
const releaseNoteUser: IUser = {
    id: userId++,
    joinedDate: created,
    name: "Release Notes"
};

export const mockForums: IForum[] = [
    {
        id: forumId++,
        created: created,
        name: "Site",
        description: "Site related posts.",
        threads: [
            {
                id: threadId++,
                created: created,
                name: "Rules",
                messages: [
                    {
                        id: messageId++,
                        created: created,
                        user: user,
                        content: "Be nice."
                    },
                    {
                        id: messageId++,
                        created: created,
                        user: user,
                        content: "Don't be horrible."
                    },
                    {
                        id: messageId++,
                        created: created,
                        user: user,
                        content: "No spam."
                    }
                ]
            },
            {
                id: threadId++,
                created: created,
                name: "Help & troubleshooting",
                messages: [
                    {
                        id: messageId++,
                        created: created,
                        user: user,
                        content: "Report bugs here."
                    }
                ]
            },
            {
                id: threadId++,
                created: created,
                name: "Release - v1.0.0-alpha.1",
                messages: [
                    {
                        id: messageId++,
                        created: created,
                        user: releaseNoteUser,
                        content: "Coming soon."
                    }]
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
                name: "Welcome thread",
                messages: []
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
