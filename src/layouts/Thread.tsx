import React from "react";
import { Avatar, Content, FlexboxGrid, Panel, PanelGroup } from "rsuite";
import { IThread } from "../types/IThread";
import { formatDate } from "../utils/dateUtils";
import { acronym } from "../utils/stringUtils";

export interface IProps {
    thread: IThread;
}

export function Thread(props: IProps) {
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
            </PanelGroup>
        </Panel>
    );
}
