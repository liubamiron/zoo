import React, {useEffect, useState} from 'react';
import {createEventData, fetchEventsById} from "../../utils/apiCalls";
import {Button, Col, Form, Row} from "react-bootstrap";

// title_ru
// title_ro
// title_en
//
// time_event_ru
// time_event_ro
// time_event_en
//
// short_description_ru
// short_description_ro
// short_description_en
//
// long_description_ru
// long_description_ro
// long_description_en

const Events = () => {

    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

    // Time event states
    const [timeEventRU, setTimeEventRU] = useState('');
    const [timeEventRO, setTimeEventRO] = useState('');
    const [timeEventEN, setTimeEventEN] = useState('');

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

    // const [eventsData, setEventsData] = useState('');

    // useEffect(() => {
    //     const getEvents = async () => {
    //         try {
    //             const data = await fetchEventsById();
    //             setEventsData(data);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //         }
    //     };
    //
    //     getEvents();
    // }, []);

    const handleEventCreate = async (event) => {
        event.preventDefault();

        // Construct the event object using the state values
        const eventData = {
            title_ru: titleRU,
            title_ro: titleRO,
            title_en: titleEN,
            time_event: timeEvent,
            start_date_event:dateStartEvent ,
            end_date_event: dateEndEvent,
            short_description_ru: shortDescriptionRU,
            short_description_ro: shortDescriptionRO,
            short_description_en: shortDescriptionEN,
            long_description_ru: longDescriptionRU,
            long_description_ro: longDescriptionRO,
            long_description_en: longDescriptionEN,
        };

        try {
            const response = await createEventData(eventData);
            if (response) {
                console.log('Event created successfully:', response);
                // Optionally clear form fields or show a success message
            }
        } catch (error) {
            console.error('Error while creating event:', error);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>

            <Form onSubmit={handleEventCreate}>
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
                        <Form.Group controlId="time_event_ro">
                            <Form.Label>time Event RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEventRO}
                                onChange={(event) => setTimeEventRO(event.target.value)}
                                placeholder="Enter time event ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="time_event_ru">
                            <Form.Label>time Event RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEventRU}
                                onChange={(event) => setTimeEventRU(event.target.value)}
                                placeholder="Enter time event ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="time_event_en">
                            <Form.Label>time Event EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEventEN}
                                onChange={(event) => setTimeEventEN(event.target.value)}
                                placeholder="Enter time event en"
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
                <br />
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>

        </div>
    );
};

export default Events;
