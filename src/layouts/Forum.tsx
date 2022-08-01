import Link from "next/link";
import React, { Fragment } from "react";
import { Button, Content, Pagination, Panel, PanelGroup, Table } from "rsuite";
import { IForum } from "../types/IForum";
import { IUser } from "../types/IUser";
import { formatDate } from "../utils/dateUtils";

const { Column, HeaderCell, Cell } = Table;

export interface IProps {
    forum: IForum;
    user?: IUser;
}

export function Forum({ forum, user }: IProps) {
    return (
        <Panel header={<h3>{forum.name}</h3>}>
            <Content>
                {forum.description &&
                    <Fragment>
                        <p>
                            {forum.description}
                        </p>

                        <hr />
                    </Fragment>
                }

                {user &&
                    <PanelGroup>
                        <Link href={`/forums/${forum.id}/new`}>
                            <a>
                                <Button appearance="primary">
                                    New Thread
                                </Button>
                            </a>
                        </Link>
                    </PanelGroup>
                }

                {forum.threads &&
                    <PanelGroup>
                        <Table data={forum.threads} autoHeight wordWrap>
                            <Column flexGrow={11}>
                                <HeaderCell>Threads</HeaderCell>
                                <Cell>{(x) => <Link href={`/threads/${x.id}`}><a>{x.name}</a></Link>}</Cell>
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Last post</HeaderCell>
                                <Cell>{(x) => formatDate(x.created)}</Cell>
                            </Column>
                        </Table>

                        <Pagination limit={10} total={forum.threads.length}>
                        </Pagination>
                    </PanelGroup>
                }
            </Content>
        </Panel>
    );
}
