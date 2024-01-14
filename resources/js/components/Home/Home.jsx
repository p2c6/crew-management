import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Navbar } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <h1>Home Content</h1>
                {/* Add your main content here */}
            </Container>
        </>

    );
};

