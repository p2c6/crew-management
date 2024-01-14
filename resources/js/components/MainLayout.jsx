import { Col, Container, Row } from "react-bootstrap";
import Layout from "./UI/Layout";
import Main from "./UI/Main";
import Sidebar from "./UI/Sidebar";
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
    return (
        <Container fluid>
            <Row style={{ minHeight: '100vh' }}>
                <Col xs={2} id="sidebar" className="custom-sidebar d-flex flex-column">
                    <Sidebar />
                </Col>
                <Col xs={10} id="page-content">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}
