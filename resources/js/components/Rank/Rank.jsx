import { useLocation } from 'react-router-dom';
import { Container, Navbar } from "react-bootstrap";
import CustomAlert from "../utils/CustomAlert";
import RankList from "./RankList";

export default function Rank() {
    const location = useLocation();
    const message = location.state?.message;

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Ranks</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {message && <CustomAlert message={message} />}
                <RankList />
            </Container>
        </>
    )
}