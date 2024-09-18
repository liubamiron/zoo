import {useEffect, useState} from 'react';
import {
    fetchTenderById,
    updateTenderData
} from "../../utils/apiCalls.js";
import {useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";

function TenderEdit() {
    const {id} = useParams();

    const [titleRU, setTitleRU] = useState('')
    const [titleRO, setTitleRO] = useState('')
    const [titleEN, setTitleEN] = useState('')

    const [descriptionRU, setDescriptionRU] = useState('');
    const [descriptionRO, setDescriptionRO] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');

    const [file, setFile] = useState('');

    useEffect(() => {
        const getTender = async () => {
            try {
                const data = await fetchTenderById(id);
                console.log(data, 'data');
                setTitleRU(data?.title_ru);
                setTitleRO(data?.title_ro);
                setTitleEN(data?.title_en);
                setDescriptionRU(data?.description_ru)
                setDescriptionRO(data?.description_ro)
                setDescriptionEN(data?.description_en)
                setFile(data?.pdf_file)

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        getTender();
    }, []);

    const handleTenderUpdate = async (event) => {
        event.preventDefault();
        // Construct the event object using the state values
        const formData = new FormData();
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('description_ru', descriptionRU);
        formData.append('description_ro', descriptionRO);
        formData.append('description_en', descriptionEN);
        formData.append('pdf_file', file);

        updateTenderData(id, formData)
            .then((response) => {
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handlePdfChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log('Selected PDF file:', selectedFile);
    };

    return (
        <div>
            TenderEdit {id}
            <Form onSubmit={handleTenderUpdate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="title_ru">
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
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="description_ro">
                            <Form.Label>description RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={descriptionRO}
                                onChange={(event) => setDescriptionRO(event.target.value)}
                                placeholder="description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description_ru">
                            <Form.Label>description RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={descriptionRU}
                                onChange={(event) => setDescriptionRU(event.target.value)}
                                placeholder="description ru"
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
                                placeholder="description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className={'mt-4'}>
                    <Col xs={6}>
                        <a href={`${import.meta.env.VITE_URL}/${file}`} target='_blank' style={{color: 'green'}}>
                            Click to view uploaded pdf_file
                        </a>
                    </Col>
                </Row>

                <Row className={'mt-4'}>
                    <Col xs={6}>
                        <Form.Group controlId="pdf_file">
                            <Form.Label>Pdf URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handlePdfChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default TenderEdit;