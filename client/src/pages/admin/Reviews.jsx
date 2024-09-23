import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { deleteReviewsById, fetchReviewsData} from "../../utils/apiCalls.js";
import {Button, Container} from "react-bootstrap";

// title_ru,
//     title_ro,
//     title_en,
//     short_description_ru,
//     short_description_ro,
//     short_description_en,
//     long_description_ru,
//     long_description_ro,
//     long_description_en,
//     rating


const Reviews = () => {

    const [reviewsData, setReviewsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchReviewsData();
                setReviewsData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);

    console.log(reviewsData, 'reviewsData');

    const handleCreateNew = () => {
        navigate('/admin/reviews/create');
    };

    const handleDelete = async (id) => {
        try {
            await deleteReviewsById(id);
            setReviewsData((prevData) => prevData.filter(review => review.id !== id));
            console.log('review deleted successfully');
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };



    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h4>Reviews List</h4>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Review
                </Button>
            </div>
            <div className="mt-4" style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                {reviewsData.map((review) => (
                    <div className={'d-flex justify-content-between mb-2'}  key={review.id}
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
                            onClick={() => navigate(`/admin/reviews/${review.id}`)}
                        >
                            {review?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(review.id)}>
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>

        </Container>
    );
};

export default Reviews;