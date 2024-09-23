import {useState} from 'react';
import {createEventData} from "../../utils/apiCalls";
import {Button, Col, Form, Row} from "react-bootstrap";


const EventCreate = () => {

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
            <h4>Create Event</h4>
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
                        {/*<Form.Group controlId="time_event_ru">*/}
                        {/*    <Form.Label>Time Event </Form.Label>*/}
                        {/*    <Form.Control*/}
                        {/*        type="text"*/}
                        {/*        value={timeEvent}*/}
                        {/*        // onChange={(event) => setTimeEvent(event.target.value)}*/}
                        {/*        onChange={(event) => {*/}
                        {/*            const value = event.target.value;*/}
                        {/*            const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;  // Regex for hh:mm format*/}

                        {/*            if (timeFormat.test(value)) {*/}
                        {/*                setDateEndEvent(value);  // Update the state if the format is correct*/}
                        {/*            } else {*/}
                        {/*                console.log('Invalid time format. Please use hh:mm.');*/}
                        {/*            }*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*    {dateEndEvent && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(dateEndEvent) && (*/}
                        {/*        <Form.Text className="text-danger">*/}
                        {/*            Invalid time format. Please use hh:mm.*/}
                        {/*        </Form.Text>*/}
                        {/*    )}*/}
                        {/*</Form.Group>*/}
                        <Form.Group controlId="time_event_ru">
                            <Form.Label>Time Event</Form.Label>
                            <Form.Control
                                type="text"
                                value={timeEvent}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    const timeFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;  // Regex for hh:mm format
                                    if (timeFormat.test(value)) {
                                        setTimeEvent(value);  // Update state if the format is valid
                                    } else {
                                        setTimeEvent(value);  // Still update the state for feedback but with invalid input
                                    }
                                }}
                                placeholder="Enter time in hh:mm format"
                            />
                            {/* Display error message if the format is incorrect */}
                            {timeEvent && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeEvent) && (
                                <Form.Text className="text-danger">
                                    Invalid time format. Please use hh:mm.
                                </Form.Text>
                            )}
                        </Form.Group>


                    </Col>
                    <Col>
                        <Form.Group controlId="time_event_ro">
                            <Form.Label>Start Date  Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateStartEvent}
                                onChange={(event) => setDateStartEvent(event.target.value)}
                                placeholder="Enter start date for event"
                                min={new Date().toISOString().split("T")[0]}  // Today or future dates only
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="time_event_en">
                            <Form.Label>End Time Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateEndEvent}
                                placeholder="Enter end date for event"
                                onChange={(event) => setDateEndEvent(event.target.value)}
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

export default EventCreate;
