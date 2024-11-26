import {Link} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {Button, Card, Col, Form, Row, Pagination} from "react-bootstrap";
import {useEffect, useState} from "react";
import {createEmailSubscribe, fetchReviewsData} from "../utils/apiCalls.js";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";

function ReviewsPage() {
    const {t, language} = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
    const reviewsPerPage = 9; // Reviews per page

    // Fetch reviews data
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchReviewsData();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };
        getData();
    }, []);

    // Get current reviews based on pagination
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
            </div>
            <div className="mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green">
                <span className="d-flex align-items-center">
                    <Link to="/" className="d-flex align-items-center">
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/reviews'}>{t('REVIEWS')}</Link>
                </span>
            </div>
            <div className={"container"}>
                <br/>
                <h2 className={'text-center mt-2'}>{t('REVIEWS')}</h2>
                <p className={'text-center mb-4'}>{t('REVIEWS_LOCAL')}</p>
                <br/>
                <Row className={'color_green mt-2 mb-4'}>
                    {currentReviews.map((item) => (
                        <Col xs={12} md={4} key={item.id}>
                            <Card className={'bg_light_green p-4 text-center mb-5'}>
                                <div className={'d-flex align-items-center justify-content-center'}>
                                    <img src="/quotes.svg" alt={'quotes'} width={'24px'} className={'img-fluid'}/>
                                </div>
                                <Card.Body>
                                    <p>{item[`long_description_${language}`]}</p>
                                    {[...Array(5)].map((_, index) => (
                                        <img
                                            key={index}
                                            src={index < item.rating ? '/icons/star.svg' : '/icons/star_empty.svg'}
                                            alt={index < item.rating ? 'full star' : 'empty star'}
                                            style={{width: '20px', height: '20px', marginRight: '5px'}}
                                        />
                                    ))}
                                </Card.Body>
                                <div style={{textDecoration: 'underline'}} className={'mt-3 text-center'}>
                                    {item[`title_${language}`]}</div>
                                <div style={{fontStyle: 'italic'}} className={'text-center'}>{t('VISITATOR')}</div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <br/>

                {/* Pagination */}
                <Row className="justify-content-center mt-4">
                    <Pagination>
                        {[...Array(Math.ceil(reviews.length / reviewsPerPage))].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Row>
                <SubscribeNewsForm/>
            </div>
        </div>
    );
}

export default ReviewsPage;
