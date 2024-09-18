import {useState} from "react";
import {createTenderData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";


function TenderCreate() {
    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

    const [descriptionRU, setDescriptionRU] = useState('');
    const [descriptionRO, setDescriptionRO] = useState('');
    const [descriptionEN, setDescriptionEN] = useState('');

    const [pdf, setPdf] = useState('');

    const handleTenderCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        // Append text fields to formData
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('description_ru', descriptionRU);
        formData.append('description_ro', descriptionRO);
        formData.append('description_en', descriptionEN);
        // Append file to formData
        if (pdf) {
            formData.append('pdf_file', pdf);
        }


        try {
            const response = await createTenderData(formData);
            if (response) {
                console.log('Review created successfully:', response);
                // Optionally clear form fields or show a success message
            }
        } catch (error) {
            console.error('Error while creating Review:', error);
        }
    };


    const handlePdfChange = (e) => {
        const selectedFile = e.target.files[0];
        setPdf(selectedFile);
        console.log('Selected PDF file:', selectedFile);
    };


    return (
        <div>
            <h2>Tender Create</h2>
            <Form onSubmit={handleTenderCreate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Label>Title RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={titleRO}
                            onChange={(event) => setTitleRO(event.target.value)}
                            placeholder="Enter title ro"
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="title ru">
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
                        <Form.Group controlId="title EN">
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
                            <Form.Label>Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={descriptionRO}
                                onChange={(event) => setDescriptionRO(event.target.value)}
                                placeholder="description ro"
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
                                placeholder="description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description_en">
                            <Form.Label>short Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={descriptionEN}
                                onChange={(event) => setDescriptionEN(event.target.value)}
                                placeholder="description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="pdf">
                            <Form.Label>Pdf URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handlePdfChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default TenderCreate;