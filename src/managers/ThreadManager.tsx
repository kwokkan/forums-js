import { IProps, Thread } from "../layouts/Thread";

function onThreadNewComment(comment: string) {
    console.log(comment);
}

export function ThreadManager(props: IProps) {
    return (
        <Thread thread={props.thread} user={props.user} onNewComment={onThreadNewComment} />
    );
}
