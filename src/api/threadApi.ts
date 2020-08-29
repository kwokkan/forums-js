import { IMessage } from "../types/IMessage";
import { IThread } from "../types/IThread";
import { jsonPost } from "./common";

interface IAddThreadModel {
    forumId: number;
    title: string;
    message: string;
}

export async function addMessage(id: number, message: string): Promise<IMessage> {
    const response = await jsonPost("/api/threads/" + id, { message });

    if (!response.ok) {
        throw new Error("Failed to add message: " + response.statusText);
    }

    return response.json();
}

export async function addThread({ forumId, title, message }: IAddThreadModel): Promise<IThread> {
    const response = await jsonPost("/api/forums/" + forumId, { forumId, title, message });

    if (!response.ok) {
        throw new Error("Failed to add thread: " + response.statusText);
    }

    return response.json();
}
