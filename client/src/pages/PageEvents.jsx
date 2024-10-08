import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "../providers/index.js";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {createEmailSubscribe, fetchEventsData} from "../utils/apiCalls.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PaginationComponent from "../components/PaginationComponent.jsx";

function PageEvents() {
    const [startDate, setStartDate] = useState(null);
    const [allEvents, setAllEvents] = useState([]);
    const { t, language } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [emailUser, setEmailUser] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8; // Set events per page

    // Fetch all events
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchEventsData();
                // Exclude "Close" and "Opening" events initially
                setAllEvents(data.filter(event => event.title_en !== "Close" && event.title_en !== "Opening"));
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };
        getData();
    }, []);

    // Function to apply both date and search term filtering
    const applyFilters = () => {
        const filtered = allEvents.filter(event => {
            const isDateMatch = startDate ? (
                startDate >= new Date(event.start_date_event) && startDate <= new Date(event.end_date_event)
            ) : true;  // If no date is selected, don't filter by date

            const isSearchMatch = (
                event.title_ru.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.title_ro.toLowerCase().includes(searchTerm.toLowerCase())
            );

            return isDateMatch && isSearchMatch;
        });
        setFilteredEvents(filtered);
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Update filtered events when search term or date changes
    useEffect(() => {
        applyFilters();
    }, [searchTerm, startDate, allEvents]);

    // Handle search input change
    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    };

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Total pages
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    // send email addres for subscribe
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const data = await createEmailSubscribe({ email: emailUser }); // Call the createEmailSubscribe function
            setResponseMessage(data.message || 'Email sent successfully!'); // Set the response message
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to send email. Please try again.');
        }
    };

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">&nbsp;</div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                    <span>
                        <Link to={'/'}>
                            <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{ marginRight: '5px' }} />
                            ZOO
                        </Link>&nbsp;&#62;&nbsp;<Link to={'/events'}>{t('EVENTS')}</Link>
                    </span>
                </div>
            </div>
            <div className={'container'}>
                <h2 className={'text-center'}>{t('ALL_EVENTS_TITLE')}</h2>
                <p className={'text-center'}>{t('ALL_EVENTS_1')}</p>
            </div>
            <div className={'container'}>
                <Row className={'mt-5 mb-2'}>
                    {/* DatePicker column */}
                    <Col xs={12} md={8} className={'mb-4'}>
                        <div>
                            <InputGroup>
                                <InputGroup.Text className="custom-icon input-icon">
                                    <img src="/icons/calendar.svg" alt="Calendar" width="20px" />
                                </InputGroup.Text>
                                <DatePicker
                                    className="custom-datepicker"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    placeholderText="&nbsp;Calendar"
                                    isClearable
                                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))} // Sets min date to tomorrow
                                />
                            </InputGroup>
                        </div>
                    </Col>
                    {/* Search input column */}
                    <Col xs={12} md={4}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder={t('SEARCH_BY_TITLE')}
                                value={searchTerm}
                                onChange={handleSearchInput}
                                className="custom-search-input"
                            />
                            <Button variant="success" onClick={applyFilters}>
                                {t('SEARCH')}
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <br/>
                {/* Display Filtered Events */}
                <div className="mt-3">
                    <h3 className={'text-center color_green mb-4'}>{t('EVENTS')}</h3>
                    <br/>
                    <Row className="mt-4">
                        {currentEvents
                            .map((event, index) => {
                                const eventDate = new Date(event.start_date_event);
                                const options = { month: 'long', day: 'numeric' }; // Format options for month and day
                                const formattedDate = eventDate.toLocaleDateString('ro-RO', options); // Change locale as needed

                                return (
                                    <Col xs={12} md={6} key={event.id} className="mb-4">
                                        <div
                                            className={`p-3 text-center d-flex flex-column justify-content-between ${
                                                index === 0 ? 'bg_green color_white' : 'bg_light_green color_green'
                                            }`}
                                        >
                                            <Row >
                                                <Col xs={12} md={7} className="d-flex flex-column justify-content-between h-100">
                                                    <div
                                                        style={{
                                                            backgroundColor: 'yellow',
                                                            backgroundImage: `url(${import.meta.env.VITE_URL}/${event.img})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            height: '240px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        <Row style={{ margin: 'unset' }} className={'pt-2'}>
                                                            <Col xs={7} md={7}>
                                                                &nbsp;
                                                            </Col>
                                                            <Col xs={5} md={5}>
                                                                <div className={'bg_yellow'}>
                                                                    <strong>{formattedDate}</strong>
                                                                    <br />
                                                                    &nbsp;
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={5} className="d-flex flex-column justify-content-between ">
                                                    <h5>{event[`title_${language}`]}</h5>
                                                    <p>{event[`short_description_${language}`]}</p>
                                                    <div>{t("MORE_INFO")}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                );
                            })}
                        <br />
                    </Row>
                </div>
                {/* Pagination Controls */}
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
                <br/>
                <Row  className={'bg_green p-3 mt-5'}>
                    <Col>
                        <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
                    </Col>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                        <Row className={'color_white mt-4'}>
                            <Col>
                                <Form.Group controlId="nameEN">
                                    <Form.Control
                                        type="email"
                                        value={emailUser}
                                        onChange={(e) => setEmailUser(e.target.value)} // Use a function to update state
                                        placeholder={t('ENTER_EMAIL')}
                                    />
                                </Form.Group>
                                {responseMessage && <p>{responseMessage}</p>}
                            </Col>
                            <Col>
                                <Button variant={'outline-warning'} type={'submit'}>{t('SUBSCRIBE')}</Button>
                            </Col>
                            <div className={'mt-2 '} style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_1')}</div>
                            <div style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_2')}</div>
                        </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PageEvents;
