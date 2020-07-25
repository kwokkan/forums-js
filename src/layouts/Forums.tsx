import React from "react";
import { Content, Panel, PanelGroup } from "rsuite";
import { IForum } from "../types/IForum";

interface IProps {
    forums: IForum[];
}

export function Forums(props: IProps) {
    return (
        <PanelGroup>
            {props.forums.map(x =>
                <Panel key={x.id} header={<h3>{x.name}</h3>} bordered>
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
