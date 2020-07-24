import React from "react";
import { Message } from "rsuite";

interface IProps {
    title: string;
    message: string;
}

export function Announcement(props: IProps) {
    return (
        <Message
            showIcon
            type="info"
            title={props.title}
            description={<p>{props.message}</p>}
        >
        </Message>
    );
}
