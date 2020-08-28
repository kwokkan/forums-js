import Link from "next/link";
import React, { Fragment } from "react";
import { Button, Content, Panel, PanelGroup, Table } from "rsuite";
import { IForum } from "../types/IForum";
import { IThread } from "../types/IThread";
import { IUser } from "../types/IUser";
import { formatDate } from "../utils/dateUtils";

const { Column, HeaderCell, Cell, Pagination } = Table;

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
                        <Link href="/forums/[id]/new" as={`/forums/${forum.id}/new`}>
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
                                <Cell>{(x: IThread) => <Link href="/threads/[id]" as={`/threads/${x.id}`}><a>{x.name}</a></Link>}</Cell>
                            </Column>

                            <Column flexGrow={1}>
                                <HeaderCell>Last post</HeaderCell>
                                <Cell>{(x: IThread) => formatDate(x.created)}</Cell>
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
