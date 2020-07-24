import React, { Fragment } from "react";
import { Announcement } from "./Announcement";
import { Navigation } from "./Navigation";

interface IProps {
    title: string;
}

export function App(props: IProps) {
    return (
        <Fragment>
            <Navigation title={props.title}></Navigation>

            <Announcement title="Coming soon" message="Coming soon."></Announcement>
        </Fragment>
    );
}
