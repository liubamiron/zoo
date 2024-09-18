import {useState} from "react";
import { createActivitiesData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";


function ActivitiesCreate() {

    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

    // Short description states
    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    // Long description states
    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);

    const handleActivitiesCreate  = (event) => {
        event.preventDefault();

        const formData = new FormData();
        // Append text fields to formData
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_en', shortDescriptionEN);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_en', longDescriptionEN);
        formData.append('img_1', img1);
        formData.append('img_2', img2);

        createActivitiesData(formData)
            .then((response) => {
                console.log('Success:', response);
                // Handle success, e.g., showing a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, e.g., showing an error message
            });
    };

    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
        console.log(img1, 'img1')
    };

    // Handler for the second image input
    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };

    return (
        <div>
           <h4> Create Activities </h4>
            <br/>
            <Form onSubmit={handleActivitiesCreate}>
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
                        <Form.Group controlId="short_description_ro">
                            <Form.Label>short Description RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRO}
                                onChange={(event) => setShortDescriptionRO(event.target.value)}
                                placeholder="short description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>short Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRU}
                                onChange={(event) => setShortDescriptionRU(event.target.value)}
                                placeholder="short description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>short Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionEN}
                                onChange={(event) => setShortDescriptionEN(event.target.value)}
                                placeholder="short description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="long_description_ro">
                            <Form.Label>Long Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRO}
                                onChange={(event) => setLongDescriptionRO(event.target.value)}
                                placeholder="Enter long description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_ru">
                            <Form.Label>Long Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRU}
                                onChange={(event) => setLongDescriptionRU(event.target.value)}
                                placeholder="Enter long description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_en">
                            <Form.Label>Long Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionEN}
                                onChange={(event) => setLongDescriptionEN(event.target.value)}
                                placeholder="Enter long description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>
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
                </Row>
                <br />
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ActivitiesCreate;