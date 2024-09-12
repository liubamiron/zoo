import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {fetchEventsData} from "../../utils/apiCalls";

const Events = () => {
    const [eventsData, setEventsData] = useState([]);  // List of all animals
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchEventsData();
                setEventsData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };

        getData();
    }, []);

    console.log(eventsData, 'eventsData')

    const handleCreateNew = () => {
        // Navigate to the "Create New Animal" page
        navigate('/admin/events/create'); // Adjust the route as needed
    };

    const handleDelete = async (eventId) => {
        try {
            await deleteEventById(eventId);
            setEventsData((prevData) => prevData.filter(event => event.id !== eventId));
            console.log('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h1>Events List</h1>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New
                </Button>
            </div>

            <div className="mt-4"  style={{background: 'lightcyan'}}>
                {eventsData.map((event) => (
                    <div className={'d-flex justify-content-between mb-2'}  key={event.id}>
                        <div
                            className="me-2"

                            onClick={() => navigate(`/admin/events/${event.id}`)}
                        >
                            {event?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(event.id)}
                        >
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Events;
