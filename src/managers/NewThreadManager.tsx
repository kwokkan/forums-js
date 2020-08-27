import { NewThread } from "../layouts/NewThread";

export function NewThreadManager() {
    const onNewThreadNewThread = async (title: string, message: string) => {
    };

    return (
        <NewThread onNewThread={onNewThreadNewThread} />
    );
}
