import React, { ReactNode } from "react";
import { Container, Content, Header } from "rsuite";
import { Announcement } from "./Announcement";
import { Navigation } from "./Navigation";

interface IProps {
    title: string;
    children: ReactNode;
}

export function App(props: IProps) {
    return (
        <div className="navbar-page">
            <Container>
                <Header>
                    <Navigation title={props.title}></Navigation>
                </Header>

                <Content>
                    <Announcement title="Coming soon" message="Coming soon."></Announcement>

                    {props.children}
                </Content>
            </Container>
        </div>
    );
}
