import { useParams } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import { getDocument } from '../../../actions/documents';
import { useEffect, useState } from 'react';
import EditDocumentForm from './EditDocumentForm';

export default function EditDocument() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    const getDocumentById = async (id) => {
        try {
            const response = await getDocument(id);
            setDocument(response.data);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    useEffect(() => {
        getDocumentById(id);
    }, [id]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Editing Document</Navbar.Brand>
                </Container>
            </Navbar>
            <Container fluid>
                {document !== null ? (
                    <EditDocumentForm document={document} />
                ) : (
                    <p>Loading document data...</p>
                )}
            </Container>
        </>
    );
}
