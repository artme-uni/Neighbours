import React from "react";

import {Navbar, Nav, Container} from 'react-bootstrap';

import './MainHeader.css'

class MainHeader extends React.Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect fixed={'top'} expand={'sm'}>
                    <Container className={'header'}>
                        <Navbar>
                            <Navbar.Brand className={'name'} href="/">Neighbors</Navbar.Brand>
                        </Navbar>

                        <Navbar>
                            <Nav.Link className={'link'} href={'/profile'}>Profile</Nav.Link>
                            <Nav.Link className={'link'} href={'/feed'}>Feed</Nav.Link>
                            <Nav.Link className={'link'} href={'/messenger'}>Messenger</Nav.Link>
                        </Navbar>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default MainHeader;