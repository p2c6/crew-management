import { Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
    faIdCardClip,
    faPeopleGroup,
    faFolderOpen,
    faUserNurse,
    faUserGear,
    faHome
} from '@fortawesome/free-solid-svg-icons';
import "../../../css/Sidebar.css";

export default function Sidebar() {
    return (
        <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-column">
                            <Nav>
                                <p style={{ fontWeight: 'bolder', color: "#fff", fontSize: 20, color: "#fff" }}>Crew Management System</p>
                            </Nav>
                            <Nav.Link to="/home" className="custom-nav-link">
                                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                                <Link to="/home">Home</Link>
                            </Nav.Link>
                            <Nav.Link className="custom-nav-link">
                                <FontAwesomeIcon icon={faPeopleGroup} style={{ marginRight: '10px' }} />
                                <Link to="/crews">Crew</Link>
                            </Nav.Link>
                            {/* <Nav.Link className="custom-nav-link" style={{ marginTop: 5, marginBottom: 5 }}>
                                <FontAwesomeIcon icon={faIdCardClip} style={{ marginRight: '10px' }} />
                                <Link to="/crew-documents">Crew Documents</Link>
                            </Nav.Link> */}
                            <Nav>
                                <p style={{ fontWeight: 'bolder', color: "#fff" }}>Configuration / Setup</p>
                            </Nav>
                            <Nav.Link className="custom-nav-link">
                                <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '10px' }} />
                                <Link to="/documents">Documents</Link>
                            </Nav.Link>
                            <Nav.Link className="custom-nav-link">
                                <FontAwesomeIcon icon={faUserNurse} style={{ marginRight: '10px' }} />
                                <Link to="/ranks">Ranks</Link>
                            </Nav.Link>
                            <Nav>
                                <p style={{ fontWeight: 'bolder', color: "#fff" }}>Others</p>
                            </Nav>
                            <Nav.Link className="custom-nav-link">
                                <FontAwesomeIcon icon={faUserGear} style={{ marginRight: '10px' }} />
                                <Link to="/users">Users</Link>
                            </Nav.Link>
                            {/* Add more Nav.Link items as needed */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )

}
