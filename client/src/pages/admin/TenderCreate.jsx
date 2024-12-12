import { useEffect, useState } from "react";
import { createTenderData, fetchTypeTenderData } from "../../utils/apiCalls.js";
import { Button, Col, Form, Row, Alert } from "react-bootstrap"; // Import Alert for the success message

function TenderCreate() {
    const [titleRU, setTitleRU] = useState('');
    const [titleRO, setTitleRO] = useState('');
    const [titleEN, setTitleEN] = useState('');
    const [descriptionRU, setDescriptionRU] = useState('');
    const [descriptionRO, setDescriptionRO] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');
    const [pdf, setPdf] = useState('');
    const [typeTenders, setTypeTenders] = useState([]);
    const [selectedTypeTender, setSelectedTypeTender] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

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

    const handleTenderCreate = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error
        setSuccessMessage(''); // Clear any previous success

        if (!titleRO || !titleRU || !titleEN) {
            setErrorMessage('Please fill in all title fields.');
            return;
        }
        if (!selectedTypeTender) {
            setErrorMessage('Please select a tender type.');
            return;
        }

        const formData = new FormData();
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('description_ru', descriptionRU);
        formData.append('description_ro', descriptionRO);
        formData.append('description_en', descriptionEN);
        formData.append('typeTenderId', selectedTypeTender);

        if (pdf) {
            formData.append('pdf_file', pdf);
        }

        try {
            const response = await createTenderData(formData);
            if (response) {
                setSuccessMessage('Tender created successfully!');
                // Clear form fields
                setTitleRU('');
                setTitleRO('');
                setTitleEN('');
                setDescriptionRU('');
                setDescriptionRO('');
                setDescriptionEN('');
                setPdf('');
                setSelectedTypeTender('');
            }
        } catch (error) {
            console.error('Error while creating tender:', error);
            setErrorMessage('An error occurred while creating the tender. Please try again.');
        }
    };

    const handlePdfChange = (e) => {
        const selectedFile = e.target.files[0];
        setPdf(selectedFile);
    };

    const handleTypeTenderChange = (e) => {
        setSelectedTypeTender(e.target.value);
    };

    return (
        <div>
            <h2>Tender Create</h2>
            {successMessage && (
                <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    {errorMessage}
                </Alert>
            )}
            <Form onSubmit={handleTenderCreate}>
                <Row className="mt-4">
                    <Col>
                        <Form.Label>Title RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={titleRO}
                            onChange={(event) => setTitleRO(event.target.value)}
                            placeholder="Enter title RO"
                        />
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
                                as="textarea"
                                rows={3}
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
                                as="textarea"
                                rows={3}
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
                                as="textarea"
                                rows={3}
                                value={descriptionEN}
                                onChange={(event) => setDescriptionEN(event.target.value)}
                                placeholder="Enter description EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="pdf">
                            <Form.Label>PDF File</Form.Label>
                            <Form.Control type="file" onChange={handlePdfChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
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

export default TenderCreate;
