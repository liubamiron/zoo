import  { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { deleteAnimalById, fetchAnimalData } from "../../utils/apiCalls";
import { useNavigate } from 'react-router-dom';

const AdminAnimals = () => {
    const [animalData, setAnimalData] = useState([]);  // List of all animals
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAnimalData();
                setAnimalData(data.rows);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animal data:', error);
            }
        };

        getData();
    }, []);

    console.log(animalData, 'animalData')

    const handleCreateNew = () => {
        // Navigate to the "Create New Animal" page
        navigate('/admin/animals/create'); // Adjust the route as needed
    };

    const handleDelete = async (animalId) => {
        try {
            await deleteAnimalById(animalId);
            setAnimalData((prevData) => prevData.filter(animal => animal.id !== animalId));
            console.log('Animal deleted successfully');
        } catch (error) {
            console.error('Error deleting animal:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h4>Animals List</h4>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New
                </Button>
            </div>

            <div className="mt-4"
                 // style={{background: '#cdebc5'}}
                 style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}
            >
                {animalData.map((animal) => (
                    <div className={'d-flex justify-content-between mb-2'}  key={animal.id}
                         style={{
                             border: '2px solid white',
                             borderRadius: '8px',
                             padding: '10px',
                             marginBottom: '10px'
                         }}
                    >
                        <div
                            className="me-2"
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate(`/admin/animals/${animal.id}`)}
                        >
                            {animal?.name_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(animal.id)}
                        >
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default AdminAnimals;
