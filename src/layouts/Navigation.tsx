import { Explore, Gear, Rate } from "@rsuite/icons";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { Nav, Navbar } from "rsuite";
import { IUser } from "../types/IUser";

interface IProps {
    title: string;
    user?: IUser;
}

export function Navigation(props: IProps) {
    return (
        <Navbar>
            <Navbar.Brand>
                <Link href="/">
                    <Fragment>
                        <img className="mr-3" src="/logo.png" title={props.title} alt="Logo" width="24" height="24" />
                        {props.title}
                    </Fragment>
                </Link>
            </Navbar.Brand>

            <Nav>
                <Link href="/" passHref>
                    <Nav.Item eventKey="1" icon={<Explore />}>
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
                <Nav.Item icon={<Rate />} href="https://github.com/kwokkan/forums-js" target="_blank" rel="noreferrer noopener">
                    Fork me
                </Nav.Item>

                {props.user ?
                    <Fragment>
                        <Link href="/settings" passHref>
                            <Nav.Item icon={<Gear />}>Settings</Nav.Item>
                        </Link>
                        <Nav.Item icon={<Gear />} onSelect={() => signOut}>Logout</Nav.Item>
                    </Fragment>
                    :
                    <Link href="/api/auth/signin" passHref>
                        <Nav.Item icon={<Gear />}>Login</Nav.Item>
                    </Link>
                }
            </Nav>
        </Navbar>
    );
}
