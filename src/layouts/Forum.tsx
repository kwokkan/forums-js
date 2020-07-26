import React, { Fragment } from "react";
import { Content, Panel, PanelGroup, Table } from "rsuite";
import { IForum } from "../types/IForum";
import { IThread } from "../types/IThread";

const { Column, HeaderCell, Cell, Pagination } = Table;

export interface IProps {
    forum: IForum;
}

export function Forum(props: IProps) {
    const forum = props.forum;

    return (
        <Panel header={<h3>{forum.name}</h3>} bordered>
            <Content>
                {forum.description &&
                    <Fragment>
                        <p>
                            {forum.description}
                        </p>

                        <hr />
                    </Fragment>
                }

                {forum.threads &&
                    <PanelGroup>
                        <Table data={forum.threads} autoHeight wordWrap>
                            <Column flexGrow={11}>
                                <HeaderCell>Threads</HeaderCell>
                                <Cell dataKey="name"></Cell>
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Last post</HeaderCell>
                                <Cell>{(x: IThread) => x.created.toLocaleString()}</Cell>
                            </Column>
                        </Table>

                        <Pagination displayLength={10} total={forum.threads.length} >
                        </Pagination>
                    </PanelGroup>
                }
            </Content>
        </Panel>
    );
}
