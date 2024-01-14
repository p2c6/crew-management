import { Container, Navbar } from "react-bootstrap";
import CustomAlert from "../utils/CustomAlert";
import DocumentList from "./DocumentList";
import { useLocation } from 'react-router-dom';

export default function Document() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Documents</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {message && <CustomAlert message={message} />}
                <DocumentList />
            </Container>
        </>
    )
}