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

const crewDocumentColumns = [
    {
        name: 'Document',
        selector: row => row.document_name,
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

    const handleFileUpload = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData();
            formData.append('pdfFile', file);
            formData.append('crewId', crewId)
            formData.append('code', userInput['doc-code'])
            formData.append('issued_date', userInput['issued-date'])
            formData.append('expiry_date', userInput['expiry-date'])
            formData.append('document_id', userInput['document-id'])


            await axios.post('/api/upload-crew-document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }



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
                    <Card className='p-2'>
                        <Form onSubmit={handleFileUpload}>
                            <Form.Label><p className='text-success'>Add New File (+)</p></Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="file"
                                    accept=".pdf"
                                    id="document-name"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
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

                            <Form.Group as={Col}>
                                <Form.Label>Rank</Form.Label>
                                <Form.Select defaultValue="Choose..."
                                    id="document-id"
                                    onChange={(e) => inputChangeHandler('document-id', e.target.value)}
                                >
                                    <option>CHOOSE DOCUMENT</option>
                                    <option value={2}>FORM 1</option>
                                    <option value={3}>FORM 2</option>
                                </Form.Select>
                            </Form.Group>

                            {/* <Form.Group as={Col}>
                                <Form.Label>Doc No</Form.Label>
                                <Form.Control
                                    type="date"
                                    id="doc-no"
                                    onChange={(e) => inputChangeHandler('doc-no', e.target.value)}
                                />
                            </Form.Group> */}


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