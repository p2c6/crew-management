import { Container, Navbar } from "react-bootstrap";

export default function Users() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Users</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <h1>Users Content</h1>
                {/* Add your main content here */}
            </Container>
        </>
    )
}