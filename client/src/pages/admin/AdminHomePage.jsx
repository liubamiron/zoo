import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import {createAdminHomePage, createAnimalData, editAdminHomePage} from "../../utils/apiCalls";

const AdminHomePage = () => {
    const [titleRO, setTitleRO] = useState('');
    const [titleRU, setTitleRU] = useState('');
    const [titleEN, setTitleEN] = useState('');
    const [title1RO, setTitle1RO] = useState('');
    const [title1RU, setTitle1RU] = useState('');
    const [title1EN, setTitle1EN] = useState('');
    const [description1RO, setDescription1RO] = useState('');
    const [description1RU, setDescription1RU] = useState('');
    const [description1EN, setDescription1EN] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a FormData object to handle text and file data
        const formData = new FormData();

        // Append text fields to formData
        formData.append('title_ro', titleRO);
        formData.append('title_ru', titleRU);
        formData.append('title_en', titleEN);

        formData.append('title1_ro', title1RO);
        formData.append('title1_ru', title1RU);
        formData.append('title1_en', title1EN);

        formData.append('description1_ro', description1RO);
        formData.append('description1_ru', description1RU);
        formData.append('description1_en', description1EN);

        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_en', shortDescriptionEN);

        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_en', longDescriptionEN);

        formData.append('img_1', img1);
        formData.append('img_2', img2);
        formData.append('img_3', img3);

        // Call the API function to create the homepage
        createAdminHomePage(formData)
            .then((response) => {
                console.log('Success:', response);
                // Handle success, e.g., showing a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, e.g., showing an error message
            });

        // createAdminHomePage(formData).then(r => console.log('r', r))
    }


    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
    };

    // Handler for the second image input
    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };

    // Handler for the second image input
    const handleImg3Change = (e) => {
        setImg3(e.target.files[0]);
    };

    return (
        <Container>
            <h4>Create Home Page</h4>
            <Form onSubmit={handleSubmit} className={'mt-4'}>
                <Row>
                    <Col>
                        <Form.Group controlId="title_ro">
                            <Form.Label>Title (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={titleRO}
                                onChange={(event) => setTitleRO(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_ru">
                            <Form.Label>Title (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={titleRU}
                                onChange={(event) => setTitleRU(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_en">
                            <Form.Label>Title (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={titleEN}
                                onChange={(event) => setTitleEN(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="short_description_ro">
                            <Form.Label>Short Description (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionRO}
                                onChange={(event) => setShortDescriptionRO(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>Short Description (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionRU}
                                onChange={(event) => setShortDescriptionRU(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>Short Description (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionEN}
                                onChange={(event) => setShortDescriptionEN(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="long_description_ro">
                            <Form.Label>Long Description (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={longDescriptionRO}
                                onChange={(event) => setLongDescriptionRO(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_ru">
                            <Form.Label>Long Description (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={longDescriptionRU}
                                onChange={(event) => setLongDescriptionRU(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_en">
                            <Form.Label>Long Description (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={longDescriptionEN}
                                onChange={(event) => setLongDescriptionEN(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="title1_ro">
                            <Form.Label>Title 1 (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={title1RO}
                                onChange={(event) => setTitle1RO(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title1_ru">
                            <Form.Label>Title1(RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={title1RU}
                                onChange={(event) => setTitle1RU(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title1_en">
                            <Form.Label>Title1(EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={title1EN}
                                onChange={(event) => setTitle1EN(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="description1_ro">
                            <Form.Label>Description 1 (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={description1RO}
                                onChange={(event) => setDescription1RO(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description1_ru">
                            <Form.Label>Description 1 (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={description1RU}
                                onChange={(event) => setDescription1RU(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="description1_en">
                            <Form.Label>Description 1 (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={description1EN}
                                onChange={(event) => setDescription1EN(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {/*/images row/*/}
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="img1">
                            <Form.Label>Image 1 URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImg1Change}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="img2">
                            <Form.Label>Image 2 URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImg2Change}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="img3">
                            <Form.Label>Image 3 URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImg3Change}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
};

export default AdminHomePage;
