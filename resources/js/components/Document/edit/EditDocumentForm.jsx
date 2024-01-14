import { useNavigate } from 'react-router-dom';
import { updateDocument, getDocuments } from "../../../actions/documents";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function EditDocumentForm({ document }) {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({});

    const inputChangeHandler = (input, value) => {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = {
            "document_name": userInput['document-name'],
        }

        const response = await updateDocument(document.id, formData);

        await getDocuments();

        navigate('/documents', { state: { message: response.data.message } });
    }

    useEffect(() => {
        setUserInput({
            'document-name': document.document_name || '',
        });
    }, [document]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Document Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Document Name"
                    id="document-name"
                    value={userInput['document-name']}
                    onChange={(e) => inputChangeHandler('document-name', e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}