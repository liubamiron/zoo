import {useEffect, useState} from 'react';
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
    const [dateStartEvent, setDateStartEvent] = useState(null);
    const [dateEndEvent, setDateEndEvent] = useState(null);

    // Short description states
    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    // Long description states
    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    const [img, setImg] = useState('');
    const [message, setMessage] = useState(''); // State for success/error messages

    // Function to safely convert a date
    const formatDate = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            return date.toISOString().slice(0, 10);
        }
        return ''; // Return an empty string if the date is invalid
    };


    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await fetchEventsById(id);

                setEventData(data);
                setTitleRU(data?.title_ru);
                setTitleRO(data?.title_ro);
                setTitleEN(data?.title_en);
                setTimeEvent(data?.time_event)
                setDateStartEvent(data?.start_date_event ? new Date(data?.start_date_event) : '');
                setDateEndEvent(data?.end_date_event ? new Date(data?.end_date_event) : '');
                setShortDescriptionRU(data?.short_description_ru)
                setShortDescriptionRO(data?.short_description_ro)
                setShortDescriptionEN(data?.short_description_en)
                setLongDescriptionRU(data?.long_description_ru)
                setLongDescriptionRO(data?.long_description_ro)
                setLongDescriptionEN(data?.long_description_en)
                setImg(data?.img)

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        getEvents();
    }, [id]);


    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    };

    console.log(img, 'img')

    const handleEventUpdate = async (event) => {
        event.preventDefault();

        if (dateEndEvent && dateStartEvent && dateEndEvent < dateStartEvent) {
            setMessage('End date must be after start date.');
            return;
        }

        const formData = new FormData();
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('time_event', timeEvent);
        formData.append('start_date_event', formatDate(dateStartEvent)); // Ensure the date is formatted as a string
        formData.append('end_date_event', formatDate(dateEndEvent)); // E
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_en', shortDescriptionEN);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_en', longDescriptionEN);
        formData.append('img', img);

        try {
            const response = await updateEventData(id, formData);
            console.log('Event created successfully:', response);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    console.log(eventData, 'eventData');
    return (
        <div>
            Edit event: <strong>{titleRO || ''}</strong>
            {message && <p className="text-danger">{message}</p>} {/* Display message */}

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
                            <Form.Label>Start Date Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={formatDate(dateStartEvent)}
                                onChange={(e) => setDateStartEvent(new Date(e.target.value))}
                                placeholder="Enter start date for event"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="time_event_en">
                            <Form.Label>End Time Event</Form.Label>
                            <Form.Control
                                type="date"
                                value={formatDate(dateEndEvent)}
                                onChange={(e) => setDateEndEvent(new Date(e.target.value))}
                                placeholder="Enter start date for event"
                                // min={dateStartEvent}
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
                {/* Image Upload */}
                <Row className="mt-4">
                    <Col xs={12} md={6}>
                        <img
                            src={`${import.meta.env.VITE_URL}/${img}`}
                            alt="event img"
                            className="img-fluid"
                        />
                    </Col>
                    <Col xs={12} md={6}>
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

export default Events;