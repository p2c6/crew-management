import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Card, Col, Modal, Row } from 'react-bootstrap';
import { getRanks, deleteRank } from "../../actions/ranks";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const columns = [
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true
    },
    {
        name: 'Short Name',
        selector: row => row.short_name,
        sortable: true
    },
    {
        name: 'Alias',
        selector: row => row.alias,
        sortable: true
    },
];

export default function RankList() {
    const navigate = useNavigate();
    const [rankList, setRankList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteRankId, setDeleteRankId] = useState(null);

    //OPEN MODAL CONFIRMATION
    const showDeleteConfirmation = (id) => {
        setDeleteRankId(id);
        setShowDeleteModal(true);
    };

    //DELETING CREW
    const handleDeleteConfirm = async () => {
        setShowDeleteModal(false);
        setDeleteRankId(null);

        await deleteRank(deleteRankId)
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
                                overlay={renderTooltip('', 'Edit Rank')}
                            >
                                <Button variant="warning mb-2 mt-2">
                                    <Link
                                        to={`/ranks/edit/${row.id}`}
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
                                overlay={renderTooltip('', 'Delete Rank')}
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
        if (!searchTerm) getAllRanks()

        const newData = rankList.filter(row => {
            return (
                row.code.toLowerCase().includes(searchTerm)
            );
        });

        setRankList(newData)

    }

    //GET ALL DOCUMENTS
    const getAllRanks = async () => {
        const documents = await getRanks();
        setRankList(documents.data)
    };

    useEffect(() => {
        getAllRanks();
    }, [deleteRankId]);



    return (
        <>
            <Button variant="primary mb-2 mt-2">
                <Link to="/ranks/create" style={{ textDecoration: 'none', color: "#fff" }}>Create + </Link>
            </Button>

            <Form.Control type="text" className="mb-2" placeholder="Search" onChange={handleFilter} />
            <Card>

                <DataTable
                    columns={customColumns}
                    data={rankList}
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