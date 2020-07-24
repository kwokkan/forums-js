import React from "react";
import { Container, Content, Header } from "rsuite";
import { Announcement } from "./Announcement";
import { Navigation } from "./Navigation";

interface IProps {
    title: string;
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
                </Content>
            </Container>
        </div>
    );
}
