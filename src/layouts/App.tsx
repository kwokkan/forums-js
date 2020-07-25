import React from "react";
import { Container, Content, Header } from "rsuite";
import { forums } from "../mocks/mockForums";
import { Announcement } from "./Announcement";
import { Forum } from "./Forum";
import { Forums } from "./Forums";
import { Navigation } from "./Navigation";
import { Thread } from "./Thread";

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

                    {forums.map(x =>
                        <Forum key={x.id} forum={x}></Forum>
                    )}

                    {forums.filter(x => x.threads).flatMap(x => x.threads!).map(x =>
                        <Thread key={x.id} thread={x}></Thread>
                    )}
                </Content>
            </Container>
        </div>
    );
}
