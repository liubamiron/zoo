import {useEffect, useState} from 'react';
import {fetchTenderById, fetchTypeTenderData, updateTenderData} from "../../utils/apiCalls.js";
import {useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";

function TenderEdit() {
    const {id} = useParams();

    const [titleRU, setTitleRU] = useState('');
    const [titleRO, setTitleRO] = useState('');
    const [titleEN, setTitleEN] = useState('');

    const [descriptionRU, setDescriptionRU] = useState('');
    const [descriptionRO, setDescriptionRO] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');

    const [file, setFile] = useState('');
    const [typeTenders, setTypeTenders] = useState([]);
    const [selectedTypeTender, setSelectedTypeTender] = useState('');

    useEffect(() => {
        const getTypeTenders = async () => {
            try {
                const data = await fetchTypeTenderData();
                setTypeTenders(data);
            } catch (error) {
                console.error('Error fetching type tenders:', error);
            }
        };
        getTypeTenders();
    }, []);

    useEffect(() => {
        const getTender = async () => {
            try {
                const data = await fetchTenderById(id);
                setTitleRU(data?.title_ru);
                setTitleRO(data?.title_ro);
                setTitleEN(data?.title_en);
                setDescriptionRU(data?.description_ru);
                setDescriptionRO(data?.description_ro);
                setDescriptionEN(data?.description_en);
                setFile(data?.pdf_file);
                setSelectedTypeTender(data?.typeTenderId); // Set selected tender type
            } catch (error) {
                console.error('Error fetching tender:', error);
            }
        };
        getTender();
    }, [id]);

    const handleTenderUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('description_ru', descriptionRU);
        formData.append('description_ro', descriptionRO);
        formData.append('description_en', descriptionEN);
        formData.append('pdf_file', file);
        formData.append('typeTenderId', selectedTypeTender);

        try {
            const response = await updateTenderData(id, formData);
            console.log('Success:', response);
        } catch (error) {
            console.error('Error updating tender:', error);
        }
    };

    const handlePdfChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleTypeTenderChange = (e) => {
        setSelectedTypeTender(e.target.value);
    };

    return (
        <div>
            <h1>Edit Tender {id}</h1>
            <Form onSubmit={handleTenderUpdate}>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="title_ro">
                            <Form.Label>Title RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRO}
                                onChange={(event) => setTitleRO(event.target.value)}
                                placeholder="Enter title ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_ru">
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRU}
                                onChange={(event) => setTitleRU(event.target.value)}
                                placeholder="Enter title RU"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_en">
                            <Form.Label>Title EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleEN}
                                onChange={(event) => setTitleEN(event.target.value)}
                                placeholder="Enter title EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="description_ro">
                            <Form.Label>Description RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={descriptionRO}
                                onChange={(event) => setDescriptionRO(event.target.value)}
                                placeholder="Enter description RO"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description_ru">
                            <Form.Label>Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={descriptionRU}
                                onChange={(event) => setDescriptionRU(event.target.value)}
                                placeholder="Enter description RU"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description_en">
                            <Form.Label>Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={descriptionEN}
                                onChange={(event) => setDescriptionEN(event.target.value)}
                                placeholder="Enter description EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={6}>
                        {file && (
                            <a href={`${import.meta.env.VITE_URL}/${file}`} target="_blank" rel="noreferrer" style={{ color: 'green' }}>
                                Click to view uploaded pdf_file
                            </a>
                        )}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={6}>
                        <Form.Group controlId="pdf_file">
                            <Form.Label>Pdf URL</Form.Label>
                            <Form.Control type="file" onChange={handlePdfChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="type_tenders" className="mb-4">
                            <Form.Label>Select Type Tender</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={handleTypeTenderChange}
                                value={selectedTypeTender}
                            >
                                <option value="">Select Type</option>
                                {typeTenders.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name_ro} / {item.name_ru} / {item.name_en}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default TenderEdit;
