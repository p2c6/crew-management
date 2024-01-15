import { useNavigate } from 'react-router-dom';
import { createDocument, getDocuments } from "../../../actions/documents";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorValidationAlert from '../../utils/ErrorValidationAlert';


export default function AddDocumentForm() {
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

    const [errorMessages, setErrorMessages] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()

        setErrorMessages(null)

        const formData = {
            "document_name": userInput['document-name'],
        }

        const response = await createDocument(formData);

        if (response.status === 'error') {
            setErrorMessages(response.errors)
            return false;
        }

        await getDocuments();

        navigate('/documents', { state: { message: response.data.message } });
    }

    return (
        <Form onSubmit={handleSubmit}>
            {errorMessages && <ErrorValidationAlert errors={errorMessages} />}
            <Form.Group className="mb-3">
                <Form.Label>Document Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Document Name"
                    id="document-name"
                    onChange={(e) => inputChangeHandler('document-name', e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}