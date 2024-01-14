import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function CustomAlert({ message }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="success mt-3" onClose={() => setShow(false)} dismissible>
                {/* <Alert.Heading>Creating New Crew</Alert.Heading> */}
                <p>
                    {message}
                </p>
            </Alert>
        );
    }
}

export default CustomAlert;