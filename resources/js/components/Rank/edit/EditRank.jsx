import { useParams } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { getRank } from '../../../actions/ranks';
import { useEffect, useState } from 'react';
import EditRankForm from './EditRankForm';

export default function EditRank() {
    const { id } = useParams();
    const [rank, setRank] = useState(null);

    const getRankById = async (id) => {
        try {
            const response = await getRank(id);
            setRank(response.data);
        } catch (error) {
            console.error('Error fetching rank:', error);
        }
    };

    useEffect(() => {
        getRankById(id);
    }, [id]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Editing Document</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {rank !== null ? (
                    <EditRankForm rank={rank} />
                ) : (
                    <p>Loading document data...</p>
                )}
            </Container>
        </>
    );
}
