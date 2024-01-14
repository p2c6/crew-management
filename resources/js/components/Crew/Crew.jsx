import { useLocation } from 'react-router-dom';
import { Container, Navbar } from "react-bootstrap";
import CrewList from "./CrewList";
import CustomAlert from '../utils/CustomAlert';

export default function Crew() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <>
            <Navbar bg="light" expand="lg" className="mt-2">
                <Container>
                    <Navbar.Brand href="#home">Crew</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {message && <CustomAlert message={message} />}
                <CrewList />
            </Container>
        </>
    )
}