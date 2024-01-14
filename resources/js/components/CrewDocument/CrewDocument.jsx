import { Container, Navbar } from "react-bootstrap";

export default function CrewDocument() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Crew Documents</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <h1>Crew Document Content</h1>
                {/* Add your main content here */}
            </Container>
        </>
    )
}