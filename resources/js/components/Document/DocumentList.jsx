import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { getDocuments, deleteDocument } from "../../actions/documents";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const columns = [
    {
        name: 'Document Name',
        selector: row => row.document_name,
        sortable: true
    },
];

export default function DocumentList() {
    const navigate = useNavigate();
    const [documentList, setDocumentList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteDocumentId, setDeleteDocumentId] = useState(null);

    //OPEN MODAL CONFIRMATION
    const showDeleteConfirmation = (id) => {
        setDeleteDocumentId(id);
        setShowDeleteModal(true);
    };

    //DELETING CREW
    const handleDeleteConfirm = async () => {
        setShowDeleteModal(false);
        setDeleteDocumentId(null);

        await deleteDocument(deleteDocumentId)
    };

    //CLOSE MODAL CONFIRMATION
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setDeleteDocumentId(null);
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
                                overlay={renderTooltip('', 'Edit Document')}
                            >
                                <Button variant="warning mb-2 mt-2">
                                    <Link
                                        to={`/documents/edit/${row.id}`}
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
                                overlay={renderTooltip('', 'Delete Document')}
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
        if (!searchTerm) getAllDocuments()

        const newData = documentList.filter(row => {
            return (
                row.document_name.toLowerCase().includes(searchTerm)
            );
        });

        setDocumentList(newData)

    }

    //GET ALL DOCUMENTS
    const getAllDocuments = async () => {
        const documents = await getDocuments();
        setDocumentList(documents.data)
    };

    useEffect(() => {
        getAllDocuments();
    }, [deleteDocumentId]);



    return (
        <>
            <Button variant="primary mb-2 mt-2">
                <Link to="/documents/create" style={{ textDecoration: 'none', color: "#fff" }}>Create + </Link>
            </Button>

            <Form.Control type="text" className="mb-2" placeholder="Search" onChange={handleFilter} />
            <Card>

                <DataTable
                    columns={customColumns}
                    data={documentList}
                    pagination
                />
            </Card>

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

        </>
    );
};