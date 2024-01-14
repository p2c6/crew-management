import { Container, Navbar } from "react-bootstrap";
import AddRankForm from "./AddRankForm";

export default function AddRank() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Creating New Rank</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                <AddRankForm />
            </Container>
        </>
    )
}