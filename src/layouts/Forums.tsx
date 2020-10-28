import Link from "next/link";
import React from "react";
import { Content, Panel, PanelGroup } from "rsuite";
import { IForum } from "../types/IForum";

export interface IProps {
    forums: IForum[];
}

export function Forums(props: IProps) {
    return (
        <PanelGroup>
            {props.forums.map(x =>
                <Panel key={x.id} header={<h3><Link href={`/forums/${x.id}`}><a>{x.name}</a></Link></h3>} bordered>
                    {x.description &&
                        <Content>
                            <p>
                                {x.description}
                            </p>
                        </Content>
                    }
                </Panel>
            )}
        </PanelGroup>
    );
}
