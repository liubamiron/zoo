import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {deleteEventById, fetchEventsData} from "../../utils/apiCalls";

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

        getData().then(r => console.log(r));
    }, []);

    console.log(eventsData, 'eventsData')

    const handleCreateNew = () => {
        // Navigate to the "Create New Animal" page
        navigate('/admin/events/create'); // Adjust the route as needed
    };

    const handleDelete = async (id) => {
        try {
            await deleteEventById(id);
            setEventsData((prevData) => prevData.filter(event => event.id !== id));
            console.log('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h4>Events List</h4>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Event
                </Button>
            </div>

            <div className="mt-4"  style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                {eventsData.map((event) => (
                    <div className={'d-flex justify-content-between mb-2'}  key={event.id}
                         style={{
                             border: '2px solid white',
                             borderRadius: '8px',
                             padding: '10px',
                             marginBottom: '10px'
                         }}>
                        <div
                            className="me-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/admin/events/${event.id}`)}
                        >
                            {event?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(event.id)}>
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Events;
