import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import { fetchEventsById, updateEventData} from "../../utils/apiCalls";


const Events = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState('');
    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

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

    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEventsById(id);
                console.log(data, 'data');
                setEventData(data);
                setTitleRU(data?.title_ru);
                setTitleRO(data?.title_ro);
                setTitleEN(data?.title_en);
                setTimeEvent(data?.time_event)
                setDateStartEvent(data?.start_date_event)
                setDateEndEvent(data?.end_date_event)
                setShortDescriptionRU(data?.short_description_ru)
                setShortDescriptionRO(data?.short_description_ro)
                setShortDescriptionEN(data?.short_description_en)
                setLongDescriptionRU(data?.long_description_ru)
                setLongDescriptionRO(data?.long_description_ro)
                setLongDescriptionEN(data?.long_description_en)

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        getEvents();
    }, []);


    const handleEventUpdate = async (event) => {
        event.preventDefault();

        // Construct the event object using the state values
        const eventData = {
            title_ru: titleRU,
            title_ro: titleRO,
            title_en: titleEN,
            time_event: timeEvent,
            start_date_event: dateStartEvent,
            end_date_event: dateEndEvent,
            short_description_ru: shortDescriptionRU,
            short_description_ro: shortDescriptionRO,
            short_description_en: shortDescriptionEN,
            long_description_ru: longDescriptionRU,
            long_description_ro: longDescriptionRO,
            long_description_en: longDescriptionEN,
        };

        try {
            const response = await updateEventData(id, eventData);
            if (response) {
                console.log('Event created successfully:', response);
                // Optionally clear form fields or show a success message
            }
        } catch (error) {
            console.error('Error while creating event:', error);
        }
    };

    console.log(eventData, 'eventData');
    return (
        <div>
            <h1>Edit Event id = {id}</h1>

            <Form onSubmit={handleEventUpdate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="title ro">
                            <Form.Label>Title RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRO || ''}
                                onChange={(event) => setTitleRO(event.target.value)}
                                placeholder="Enter title ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title ru">
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRU || ''}
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
                                value={titleEN || ''}
                                onChange={(event) => setTitleEN(event.target.value)}
                                placeholder="Enter title EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="time_event">
                            <Form.Label>time Event</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEvent || ''}
                                onChange={(event) => setTimeEvent(event.target.value)}
                                placeholder="Enter time event"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="start_date_event">
                            <Form.Label>Start date event</Form.Label>
                            <Form.Control
                                type="text"
                                value={dateStartEvent || ''}
                                onChange={(event) => setDateStartEvent(event.target.value)}
                                placeholder="Enter date start event"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="end_date_event">
                            <Form.Label>End date event</Form.Label>
                            <Form.Control
                                type="text"
                                value={dateEndEvent || ''}
                                onChange={(event) => setDateEndEvent(event.target.value)}
                                placeholder="Enter end event date"
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
                                value={shortDescriptionRO || ''}
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
                                value={shortDescriptionRU || ''}
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
                                value={shortDescriptionEN || ''}
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
                                value={longDescriptionRO || ''}
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
                                value={longDescriptionRU || ''}
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
                                value={longDescriptionEN || ''}
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
