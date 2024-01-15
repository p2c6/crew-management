import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { getCrews, deleteCrew } from "../../actions/crews";
import { getCrewDocuments } from "../../actions/crewDocuments";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faEye, faFolder, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDocuments } from '../../actions/documents';
import { getDocumentURL } from '../../helper/helper';
import CustomAlert from '../utils/CustomAlert';
import ErrorValidationAlert from '../utils/ErrorValidationAlert';

const columns = [
    {
        name: 'Last Name',
        selector: row => row.last_name,
        sortable: true
    },
    {
        name: 'First Name',
        selector: row => row.first_name,
        sortable: true
    },
];

const getRowColor = (row) => {
    const expiryDate = new Date(row.expiry_date_formatted);
    const currentDate = new Date();

    const daysDifference = Math.floor((expiryDate - currentDate) / (24 * 60 * 60 * 1000));

    if (daysDifference <= 7) {
        return { backgroundColor: 'red', color: 'white', padding: 5, borderRadius: 5 };
    } else if (daysDifference <= 30) {
        return { backgroundColor: 'yellow', padding: 5, borderRadius: 5 };
    } else if (daysDifference <= 90) {
        return { backgroundColor: 'orange', padding: 5, borderRadius: 5 };
    } else {
        return {};
    }
}

function openDocumentURL(event, folder, fileName) {
    event.preventDefault();

    var url = getDocumentURL(folder, fileName);

    if (url) {
        window.open(url, '_blank');
    }
}


const crewDocumentColumns = [
    {
        name: 'Document',
        selector: row => row.document_name,
        sortable: true
    },
    {
        name: 'File',
        selector: row => (
            <a href="#" onClick={(event) => openDocumentURL(event, row.folder, row.file_name)} target="_blank" rel="noopener noreferrer">{row.original_file_name}</a>
        ),
        sortable: true
    },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true
    },
    {
        name: 'Issued Date',
        selector: row => row.issued_date_formatted,
        sortable: true
    },
    {
        name: 'Expiry Date',
        selector: row => (
            <div style={getRowColor(row)}>
                {row.expiry_date_formatted}
            </div>
        ),
        sortable: true
    },
    {
        name: 'Person In Charge',
        selector: row => row.full_name,
        sortable: true
    },
    {
        name: 'Date Created',
        selector: row => row.created_at_formatted,
        sortable: true
    },
];

export default function CrewList() {
    const navigate = useNavigate();
    const [crewList, setCrewList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCrewId, setDeleteCrewId] = useState(null);
    const [showCrewDocumentsModal, setShowCrewDocumenteModal] = useState(false);
    const [crewId, setCrewId] = useState(null);

    const [crewDocumentList, setCrewDocumentList] = useState([])


    //OPEN MODAL FOR CREW DOCUMENTS
    const showCrewDocuments = async (id) => {
        setCrewId(id)
        const crewsDocs = await getCrewDocuments(id);
        setCrewDocumentList(crewsDocs.data)
        setShowCrewDocumenteModal(true);
    };

    //CLOSE MODAL FOR CREW DOCUMENTS
    const handleCrewDocumentsCancel = () => {
        setShowCrewDocumenteModal(false);
    };


    //OPEN MODAL CONFIRMATION
    const showDeleteConfirmation = (id) => {
        setDeleteCrewId(id);
        setShowDeleteModal(true);
    };

    //DELETING CREW
    const handleDeleteConfirm = async () => {
        setShowDeleteModal(false);
        setDeleteCrewId(null);

        await deleteCrew(deleteCrewId)
    };

    //CLOSE MODAL CONFIRMATION
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setDeleteCrewId(null);
    };

    const renderTooltip = (props, message) => (
        <Tooltip id="button-tooltip" {...props}>
            {message}
        </Tooltip>
    );

    const customColumns = [
        ...columns,
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <Row>
                        <Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip('', 'View Crew Profile')}
                            >
                                <Button variant="primary mb-2 mt-2">
                                    <Link
                                        to={`/crews/edit/${row.id}`}
                                        onClick={() => handleUpdate(row.id)}
                                        style={{ textDecoration: 'none', color: "#fff" }}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Link>
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>

                    <span style={{ marginRight: 2 }}></span>

                    <Row>
                        <Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip('', 'View Crew Documents')}
                            >
                                <Button variant="danger mb-2 mt-2" onClick={() => showCrewDocuments(row.id)}>
                                    <FontAwesomeIcon icon={faFolder} />
                                </Button>
                            </OverlayTrigger>

                        </Col>
                    </Row>

                    <span style={{ marginRight: 2 }}></span>

                    <Row>
                        <Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip('', 'Edit Crew')}
                            >
                                <Button variant="warning mb-2 mt-2">
                                    <Link
                                        to={`/crews/edit/${row.id}`}
                                        onClick={() => handleUpdate(row.id)}
                                        style={{ textDecoration: 'none', color: "#fff" }}
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                </Button>
                            </OverlayTrigger>

                        </Col>
                    </Row>

                    <span style={{ marginRight: 2 }}></span>

                    <Row>
                        <Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip('', 'Delete Crew')}
                            >
                                <Button variant="danger mb-2 mt-2" onClick={() => showDeleteConfirmation(row.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </OverlayTrigger>

                        </Col>
                    </Row>
                </>
            ),
        },
    ];

    const handleFilter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if (!searchTerm) getAllCrews()

        const newData = crewList.filter(row => {
            return (
                row.last_name.toLowerCase().includes(searchTerm) ||
                row.first_name.toLowerCase().includes(searchTerm)
            );
        });

        setCrewList(newData)


    }


    //GET ALL CREWS
    const getAllCrews = async () => {
        const crews = await getCrews();
        setCrewList(crews.data)
    };

    useEffect(() => {
        getAllCrews();
    }, [deleteCrewId]);

    const crewDocumentCustomColumns = [
        ...crewDocumentColumns,
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <Row>
                        <Col>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip('', 'Delete')}
                            >
                                <Button variant="danger mb-2 mt-2" onClick={() => showDeleteConfirmation(row.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </OverlayTrigger>

                        </Col>
                    </Row>
                </>
            ),
        },
    ];

    //FILE UPLOAD
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

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
        try {
            setErrorMessages(null);

            const formData = new FormData();
            formData.append('pdfFile', file ?? '');
            formData.append('crewId', crewId)
            formData.append('code', userInput['doc-code'] ?? '')
            formData.append('issued_date', userInput['issued-date'] ?? '')
            formData.append('expiry_date', userInput['expiry-date'] ?? '')
            formData.append('document_id', userInput['document-id'] ?? '')
            formData.append('doc_no', userInput['doc-no'] ?? '')



            const response = await axios.post('/api/crew-documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            setErrorMessages(error.response.data.errors)
            console.error('Error uploading file:', error);
        }
    }

    const [documents, setDocuments] = useState([]);

    //GET ALL DOCUMENTS
    const getAllDocuments = async () => {
        const response = await getDocuments();
        setDocuments(response.data)
    };

    useEffect(() => {
        getAllDocuments();
    }, []);



    return (
        <>
            <Button variant="primary mb-2 mt-2">
                <Link to="/crews/create" style={{ textDecoration: 'none', color: "#fff" }}>Create + </Link>
            </Button>

            <Form.Control type="text" placeholder="Search" onChange={handleFilter} />

            <DataTable
                columns={customColumns}
                data={crewList}
                pagination
            />

            <Modal show={showDeleteModal} onHide={handleDeleteCancel} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this crew member?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Crew Document Modal */}
            <Modal show={showCrewDocumentsModal} onHide={handleCrewDocumentsCancel} animation={false} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Crew Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessages && <ErrorValidationAlert errors={errorMessages} />}
                    <Card className='p-2'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label><p className='text-success'>Add New File (+)</p></Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    id="document-name"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Document Name</Form.Label>
                                <Form.Select
                                    id="document-id"
                                    onChange={(e) => inputChangeHandler('document-id', e.target.value)}
                                >
                                    <option value="">CHOOSE DOCUMENT</option>
                                    {documents.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.document_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Doc No</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="doc-no"
                                    onChange={(e) => inputChangeHandler('doc-no', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Code"
                                    id="doc-code"
                                    onChange={(e) => inputChangeHandler('doc-code', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Issued Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="issued-date"
                                    onChange={(e) => inputChangeHandler('issued-date', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="expory-date"
                                    onChange={(e) => inputChangeHandler('expiry-date', e.target.value)}
                                />
                            </Form.Group>




                            <Button variant="primary mt-2" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                    <Card className='mt-2'>
                        <DataTable
                            columns={crewDocumentCustomColumns}
                            data={crewDocumentList}
                            pagination
                        />
                    </Card>
                </Modal.Body>

            </Modal>

        </>
    );
};