import { useNavigate } from 'react-router-dom';
import { updateRank, getRanks } from "../../../actions/ranks";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorValidationAlert from '../../utils/ErrorValidationAlert';

export default function EditRankForm({ rank }) {
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
            "code": userInput['code'],
            "short_name": userInput['short-name'],
            "alias": userInput['alias'],
        }

        const response = await updateRank(rank.id, formData);

        if (response.status === 'error') {
            setErrorMessages(response.errors)
            return false;
        }

        await getRanks();

        navigate('/ranks', { state: { message: response.data.message } });
    }

    useEffect(() => {
        setUserInput({
            'code': rank.code || '',
            'short-name': rank.short_name || '',
            'alias': rank.alias || '',
        });
    }, [rank]);


    return (
        <Form onSubmit={handleSubmit}>
            {errorMessages && <ErrorValidationAlert errors={errorMessages} />}
            <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Code"
                    id="code"
                    value={userInput['code']}
                    onChange={(e) => inputChangeHandler('code', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Short Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Short Name"
                    id="short-name"
                    value={userInput['short-name']}
                    onChange={(e) => inputChangeHandler('short-name', e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Alias</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Alias"
                    id="alias"
                    value={userInput['alias']}
                    onChange={(e) => inputChangeHandler('alias', e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}