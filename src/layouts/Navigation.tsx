import Link from "next/link";
import React from "react";
import { Icon, Nav, Navbar } from "rsuite";

interface IProps {
    title: string;
}

export function Navigation(props: IProps) {
    return (
        <Navbar>
            <Navbar.Header>
                <Link href="/">
                    <a className="navbar-brand logo">
                        <img className="mr-3" src="/logo.png" title={props.title} alt="Logo" width="24" height="24" />
                        {props.title}
                    </a>
                </Link>
            </Navbar.Header>

            <Navbar.Body>
                <Nav>
                    <Link href="/" passHref>
                        <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
                            Home
                        </Nav.Item>
                    </Link>

                    <Nav.Item eventKey="2">Forums</Nav.Item>
                    <Nav.Item eventKey="3">New Posts</Nav.Item>

                    <Link href="/about" passHref>
                        <Nav.Item eventKey="4">
                            About
                        </Nav.Item>
                    </Link>
                </Nav>

                <Nav pullRight>
                    <Nav.Item icon={<Icon icon="github" />} href="https://github.com/kwokkan/forums-js" target="_blank" rel="noreferrer noopener">
                        Fork me
                    </Nav.Item>
                    <Link href="/settings" passHref>
                        <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
                    </Link>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
}
