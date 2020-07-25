import React from "react";
import { Content, Panel, PanelGroup, Table } from "rsuite";
import { IForum } from "../types/IForum";

const { Column, HeaderCell, Cell, Pagination } = Table;

interface IProps {
    forum: IForum;
}

export function Forum(props: IProps) {
    const forum = props.forum;

    return (
        <Panel header={<h3>{forum.name}</h3>} bordered>
            <Content>
                {forum.description &&
                    <>
                        <p>
                            {forum.description}
                        </p>

                        <hr />
                    </>
                }

                {forum.threads &&
                    <PanelGroup>
                        <Table data={forum.threads} wordWrap>
                            <Column flexGrow={1}>
                                <HeaderCell>Threads</HeaderCell>
                                <Cell dataKey="name" ></Cell>
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
