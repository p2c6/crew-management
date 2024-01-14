import { Container, Navbar } from "react-bootstrap";
import AddDocumentForm from "./AddDocumentForm";

export default function AddDocument() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Creating New Document</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <AddDocumentForm />
            </Container>
        </>
    )
}