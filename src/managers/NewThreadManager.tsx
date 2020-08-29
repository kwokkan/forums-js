import { useRouter } from "next/router";
import { addThread } from "../api";
import { NewThread } from "../layouts/NewThread";

export interface IProps {
    forumId: number;
}

export function NewThreadManager(props: IProps) {
    const router = useRouter();

    const onNewThreadNewThread = async (title: string, message: string) => {
        var newThread = await addThread({ forumId: props.forumId, title, message });

        router.push("/threads/[id]", "/threads/" + newThread.id);
    };

    return (
        <NewThread onNewThread={onNewThreadNewThread} />
    );
}
