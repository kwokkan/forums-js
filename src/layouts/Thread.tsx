import React, { useState } from "react";
import { Avatar, Button, Content, FlexboxGrid, Input, Panel, PanelGroup } from "rsuite";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { formatDate } from "../utils/dateUtils";
import { acronym } from "../utils/stringUtils";

export interface IProps {
    thread: IThread;
    user?: IUser;
    onNewComment?: (comment: string) => void;
}

export function Thread(props: IProps) {
    const [comment, setComment] = useState<string>("");

    const thread = props.thread;

    return (
        <Panel header={<h3>{thread.name}</h3>}>
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
                                    <p>{x.content}</p>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Content>
                    </Panel>
                )}

                {props.user &&
                    <Panel>
                        <Input
                            componentClass="textarea"
                            className="mb-3"
                            rows={10}
                            placeholder="Enter comment ..."
                            style={{ resize: "both" }}
                            value={comment}
                            onChange={setComment}
                        />

                        <Button appearance="primary" onClick={() => props.onNewComment?.(comment)}>Submit</Button>
                    </Panel>
                }
            </PanelGroup>
        </Panel>
    );
}
