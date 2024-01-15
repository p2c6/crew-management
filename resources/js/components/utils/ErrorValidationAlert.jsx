import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// Change the prop name from 'error' to 'errors'
function ErrorValidationAlert({ errors }) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let errorContent;

    if (errors) {
        errorContent = (
            <ul>
                {Object.keys(errors).map((field, index) => (
                    <li key={index}>
                        {Array.isArray(errors[field]) ? (
                            errors[field].map((message, i) => (
                                <div key={i}>{message}</div>
                            ))
                        ) : (
                            <div>{errors[field]}</div>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <Alert show={show} variant="danger" onClose={handleClose} dismissible>
                {errorContent}
            </Alert>
        </div>
    );
}

export default ErrorValidationAlert;
