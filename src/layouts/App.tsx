import React from "react";
import { Navigation } from "./Navigation";

interface IProps {
    title: string;
}

export function App(props: IProps) {
    return (
        <Navigation title={props.title}></Navigation>
    );
}
