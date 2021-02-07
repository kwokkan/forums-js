import React, { useState } from "react";
import { Avatar, Button, Content, FlexboxGrid, Panel, PanelGroup } from "rsuite";
import { IBreadcrumb } from "../types/IBreadcrumb";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { formatDate } from "../utils/dateUtils";
import { acronym } from "../utils/stringUtils";
import { Breadcrumb } from "./Breadcrumb";
import { Markdown } from "./Markdown";
import { MarkdownPreview } from "./MarkdownPreview";

export interface IProps {
    thread: IThread;
    breadcrumbs: IBreadcrumb[];
    user?: IUser;
    onNewMessage?: (id: number, message: string) => Promise<void>;
}

export function Thread(props: IProps) {
    const [message, setMessage] = useState<string>("");

    const thread = props.thread;

    const onNewMessage = async () => {
        await props.onNewMessage?.(props.thread.id, message);

        setMessage("");
    };

    return (
        <Panel header={<Breadcrumb breadcrumbs={props.breadcrumbs} />}>
            <PanelGroup>
                {thread.messages.map(x =>
                    <Panel key={x.id}>
                        <Content>
                            <FlexboxGrid>
                                <FlexboxGrid.Item>
                                    <Avatar size="lg" className="mr-3" title={x.user.name}>{acronym(x.user.name)}</Avatar>
                                </FlexboxGrid.Item>

                                <FlexboxGrid.Item>
                                    <p>{formatDate(x.created)}</p>
                                    <Markdown content={x.content} />
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Content>
                    </Panel>
                )}

                {props.user &&
                    <Panel>
                        <MarkdownPreview
                            className="mb-3"
                            rows={10}
                            placeholder="Enter message..."
                            content={message}
                            onChange={setMessage}
                        />

                        <Button appearance="primary" onClick={onNewMessage}>Submit</Button>
                    </Panel>
                }
            </PanelGroup>
        </Panel>
    );
}
