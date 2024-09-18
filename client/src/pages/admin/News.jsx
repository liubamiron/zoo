import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteNewsById, fetchNewsData} from "../../utils/apiCalls.js";
import {Button, Container} from "react-bootstrap";


function News() {
    const [newsData, setNewsData] = useState([]);
    const [deleteMessage, setDeleteMessage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchNewsData();
                setNewsData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);

    console.log(newsData, 'newsData')

    const handleCreateNews = () => {
        // Navigate to the "Create New Animal" page
        navigate('/admin/news/create'); // Adjust the route as needed
    };


    const handleDelete = (id ) => {
        deleteNewsById(id)
            .then(response => response.json())
            .then((response) => {
                setNewsData(response);
                setDeleteMessage('The news was deleted successfully!');
                console.log('Success delete:', response);
            })
            .catch(error => console.error('Error delete:', error));
    };


    return (
        <div>
            <Container>
                <div className={'d-flex justify-content-between mt-4'}>
                    <h4>News List</h4>
                    <Button variant={'outline-success'} onClick={handleCreateNews}>
                        Create News
                    </Button>
                </div>
                <div className="mt-4" style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                    {newsData.map((item) => (
                        <div className={'d-flex justify-content-between mb-2'} key={item.id}
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
                                onClick={() => navigate(`/admin/news/${item.id}`)}
                            >
                                {item?.title_ro}
                            </div>
                            <Button
                                variant={'outline-danger'}
                                onClick={() => handleDelete(item.id)}
                            >
                                <img src={'/icons/trash.svg'} alt="Delete"/>
                            </Button>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default News;