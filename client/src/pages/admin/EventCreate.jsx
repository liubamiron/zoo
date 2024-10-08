import { useState } from 'react';
import { createEventData } from "../../utils/apiCalls";
import { Button, Col, Form, Row } from "react-bootstrap";

const EventCreate = () => {

    // Title states
    const [titleRU, setTitleRU] = useState('');
    const [titleRO, setTitleRO] = useState('');
    const [titleEN, setTitleEN] = useState('');

    // Time event states
    const [timeEvent, setTimeEvent] = useState('');
    const [dateStartEvent, setDateStartEvent] = useState('');
    const [dateEndEvent, setDateEndEvent] = useState('');

    // Short description states
    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    // Long description states
    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    const [img, setImg] = useState(null);

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handleEventCreate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('time_event', timeEvent);
        formData.append('start_date_event', dateStartEvent);
        formData.append('end_date_event', dateEndEvent);
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_en', shortDescriptionEN);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_en', longDescriptionEN);
        formData.append('img', img);

        try {
            const response = await createEventData(formData);
            console.log('Event created successfully:', response);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div>
            <h4>Create Event</h4>
            <Form onSubmit={handleEventCreate}>
                {/* Titles Section */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Title RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRO}
                                onChange={(event) => setTitleRO(event.target.value)}
                                placeholder="Enter title in Romanian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRU}
                                onChange={(event) => setTitleRU(event.target.value)}
                                placeholder="Enter title in Russian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Title EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleEN}
                                onChange={(event) => setTitleEN(event.target.value)}
                                placeholder="Enter title in English"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Time and Date Section */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Time Event (hh:mm)</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEvent}
                                onChange={(event) => {
                                    const value = event.target.value;
                                        setTimeEvent(value);
                                }}
                                placeholder="Enter time (hh:mm)"
                            />
                            {timeEvent && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeEvent) && (
                                <Form.Text className="text-danger">
                                    Invalid time format. Please use hh:mm.
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Start Date Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateStartEvent}
                                onChange={(event) => setDateStartEvent(event.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>End Date Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateEndEvent}
                                onChange={(event) => setDateEndEvent(event.target.value)}
                                placeholder="Enter end date for event"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Descriptions Section */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Short Description RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRO}
                                onChange={(event) => setShortDescriptionRO(event.target.value)}
                                placeholder="Enter short description in Romanian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Short Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRU}
                                onChange={(event) => setShortDescriptionRU(event.target.value)}
                                placeholder="Enter short description in Russian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Short Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionEN}
                                onChange={(event) => setShortDescriptionEN(event.target.value)}
                                placeholder="Enter short description in English"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Long Descriptions Section */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group>
                            <Form.Label>Long Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRO}
                                onChange={(event) => setLongDescriptionRO(event.target.value)}
                                placeholder="Enter long description in Romanian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Long Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRU}
                                onChange={(event) => setLongDescriptionRU(event.target.value)}
                                placeholder="Enter long description in Russian"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Long Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionEN}
                                onChange={(event) => setLongDescriptionEN(event.target.value)}
                                placeholder="Enter long description in English"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Image Upload */}
                <Row className="mt-4">
                    <Col xs={12} md={8}>
                        <Form.Group>
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" onChange={handleImgChange} />
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
};

export default EventCreate;
