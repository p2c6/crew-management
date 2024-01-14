import { Container, Navbar } from "react-bootstrap";
import AddCrewForm from "./AddCrewForm";
export default function AddCrew() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Creating New Crew</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <AddCrewForm />
            </Container>
        </>
    )
}