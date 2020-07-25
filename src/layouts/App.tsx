import React from "react";
import { Container, Content, Header } from "rsuite";
import { forums } from "../mocks/mockForums";
import { Announcement } from "./Announcement";
import { Forums } from "./Forums";
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

                    <Forums forums={forums}></Forums>
                </Content>
            </Container>
        </div>
    );
}
