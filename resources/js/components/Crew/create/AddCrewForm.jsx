import { useNavigate } from 'react-router-dom';
import { createCrew, getCrews } from "../../../actions/crews";
import { getRanks } from '../../../actions/ranks';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ErrorValidationAlert from '../../utils/ErrorValidationAlert';


export default function AddCrewForm() {
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
            "last_name": userInput['last-name'],
            "middle_name": userInput['middle-name'],
            "first_name": userInput['first-name'],
            "email": userInput['email'],
            "birth_date": userInput['birth-date'],
            "address": userInput['address'],
            "height": userInput['height'],
            "weight": userInput['weight'],
            "rank_id": userInput['rank-id'],
            "age": userInput['age'],
        }

        const response = await createCrew(formData);

        if (response.status === 'error') {
            setErrorMessages(response.errors)
            return false;
        }

        await getCrews();

        navigate('/crews', { state: { message: response.data.message } });
    }

    const [ranks, setRanks] = useState([]);

    //GET ALL RANKS
    const getAllRanks = async () => {
        const response = await getRanks();
        setRanks(response.data)
    };

    useEffect(() => {
        getAllRanks();
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                {errorMessages && <ErrorValidationAlert errors={errorMessages} />}
                <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        id="last-name"
                        onChange={(e) => inputChangeHandler('last-name', e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Middle Name"
                        id="middle-name"
                        onChange={(e) => inputChangeHandler('middle-name', e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        id="first-name"
                        onChange={(e) => inputChangeHandler('first-name', e.target.value)}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={(e) => inputChangeHandler('email', e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Birth Date</Form.Label>
                    <Form.Control
                        type="date"
                        id="birth-date"
                        onChange={(e) => inputChangeHandler('birth-date', e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="text"
                        id="age"
                        placeholder="Enter Age"
                        onChange={(e) => inputChangeHandler('age', e.target.value)}
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    id="address"
                    onChange={(e) => inputChangeHandler('address', e.target.value)}
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                        type="text"
                        id="height"
                        placeholder="Enter Height (CM)"
                        onChange={(e) => inputChangeHandler('height', e.target.value)}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                        type="text"
                        id="weight"
                        placeholder="Enter Weight (KG)"
                        onChange={(e) => inputChangeHandler('weight', e.target.value)}
                    />
                </Form.Group>
            </Row>

            <Form.Group as={Col}>
                <Form.Label>Rank</Form.Label>
                <Form.Select
                    id="rank-id"
                    onChange={(e) => inputChangeHandler('rank-id', e.target.value)}
                >
                    <option>CHOOSE RANK</option>
                    {ranks.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.short_name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}