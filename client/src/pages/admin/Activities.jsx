import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {deleteActivityById, fetchActivitiesData} from "../../utils/apiCalls";

const Activities = () => {
    const [activitiesData, setActivitiesData] = useState([]);  // List of all animals
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchActivitiesData();
                setActivitiesData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching activities data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);

    console.log(activitiesData, 'activitiesData')

    const handleCreateNew = () => {
        // Navigate to the "Create New Animal" page
        navigate('/admin/activities/create'); // Adjust the route as needed
    };

    const handleDelete = async (id) => {
        try {
            await deleteActivityById(id);
            setActivitiesData((prevData) => prevData.filter(activity => activity.id !== id));
            console.log('Activity deleted successfully');
        } catch (error) {
            console.error('Error deleting Activity:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h4>Activities List</h4>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Activity
                </Button>
            </div>

            <div className="mt-4" style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                {activitiesData.map((activity) => (
                    <div className={'d-flex justify-content-between mb-2'}  key={activity.id}
                         style={{
                             border: '2px solid white',
                             borderRadius: '8px',
                             padding: '10px',
                             marginBottom: '10px'
                         }}
                    >
                        <div
                            className="me-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/admin/activities/${activity.id}`)}
                        >
                            {activity?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(activity.id)}>
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Activities;
