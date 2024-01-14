import { useParams } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import EditCrewForm from './EditCrewForm';
import { getCrew } from '../../../actions/crews';
import { useEffect, useState } from 'react';

export default function EditCrew() {
    const { id } = useParams();
    const [crew, setCrew] = useState(null);

    const getCrewById = async (id) => {
        try {
            const response = await getCrew(id);
            setCrew(response.data);
        } catch (error) {
            console.error('Error fetching crew:', error);
        }
    };

    useEffect(() => {
        getCrewById(id);
    }, [id]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Editing Crew</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {crew !== null ? (
                    <EditCrewForm crew={crew} />
                ) : (
                    <p>Loading crew data...</p>
                )}
            </Container>
        </>
    );
}
