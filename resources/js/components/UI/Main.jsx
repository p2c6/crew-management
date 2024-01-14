// YourMainComponent.js

import React from 'react';
// import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Navbar } from 'react-bootstrap';

export default function Main() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <h1>Main Content</h1>
                {/* Add your main content here */}
            </Container>
        </>

    );
};

