import { useNavigate } from 'react-router-dom';
import { createRank, getRanks } from "../../../actions/ranks";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function AddRankForm() {
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
            "code": userInput['code'],
            "short_name": userInput['short-name'],
            "alias": userInput['alias'],
        }

        const response = await createRank(formData);

        await getRanks();

        navigate('/ranks', { state: { message: response.data.message } });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Code"
                    id="code"
                    onChange={(e) => inputChangeHandler('code', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Short Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Short Name"
                    id="short-name"
                    onChange={(e) => inputChangeHandler('short-name', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Alias</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Alias"
                    id="alias"
                    onChange={(e) => inputChangeHandler('alias', e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}