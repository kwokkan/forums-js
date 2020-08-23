import { useState } from "react";
import { addMessage } from "../api";
import { IProps, Thread } from "../layouts/Thread";
import { IThread } from "../types/IThread";

export function ThreadManager(props: IProps) {
    const [thread, setThread] = useState<IThread>(props.thread);

    const onThreadNewMessage = async (id: number, comment: string) => {
        const created = await addMessage(id, comment);

        setThread({
            ...thread,
            messages: [
                ...thread.messages,
                created
            ]
        });
    };

    return (
        <Thread thread={thread} user={props.user} onNewMessage={onThreadNewMessage} />
    );
}
