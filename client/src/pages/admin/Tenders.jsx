import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteTenderById, fetchTenderData} from "../../utils/apiCalls.js";
import {Button, Container} from "react-bootstrap";


const Tenders = () => {

    const [tendersData, setTendersData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTenderData();
                setTendersData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);

    console.log(tendersData, 'fetchTenderData');

    const handleCreateNew = () => {
        navigate('/admin/tenders/create');
    };

    const handleDelete = async (id) => {
        try {
            await deleteTenderById(id);
            setTendersData((prevData) => prevData.filter(tender => tender.id !== id));
            console.log('review deleted successfully');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h1>Tenders List</h1>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Tender
                </Button>
            </div>

            <div className="mt-4"
                 style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                {tendersData.map((tender) => (
                    <div className={'d-flex justify-content-between mb-2'} style={{
                        border: '2px solid white',
                        borderRadius: '8px',
                        padding: '5px',
                        marginBottom: '5px'
                    }} key={tender.id}>
                        <div
                            className="me-2"
                            onClick={() => navigate(`/admin/tenders/${tender.id}`)}
                        >
                            {tender?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(tender.id)}>
                            <img src={'/icons/trash.svg'} alt="Delete"/>
                        </Button>
                    </div>
                ))}
            </div>
        </Container>

    );
};

export default Tenders;