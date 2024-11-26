import {useTranslation} from "../providers/index.js";
import {Button, Card, Col, Row} from "react-bootstrap";
import {zoo_facilities} from "../components/Constants.jsx";
import {useEffect, useState} from "react";
import {fetchAnimalData, fetchReviewsData, fetchTypeAnimals} from "../utils/apiCalls.js";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";

const About = () => {
    const {t, language} = useTranslation();
    const [allAnimals, setAllAnimals] = useState([]);
    const [diasappearingAnimals, setDiasappearingAnimals] = useState([]);
    const [typeAnimals, setTypeAnimals] = useState([]);
    const [reviews, setReviews] = useState([]);

    const isMobile = window.matchMedia("only screen and (max-width: 575.98px)").matches;

    // get all animals
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAnimalData();
                setAllAnimals(data);  // Store the list of animals
                setDiasappearingAnimals(data.rows.filter(animal => animal.disappearing));  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'animals data'));
    }, []);

    //gte type of animals
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTypeAnimals();
                setTypeAnimals(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'animals data'));
    }, []);

    //get all reviews
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchReviewsData();
                setReviews(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'animals data'));
    }, []);

    // get animals numbers
    let totalAnimals = allAnimals.rows?.length;
    // Filter animals where disappearing is true
    let disappearingAnimals = allAnimals?.rows?.filter(animal => animal.disappearing === true);
// Get the count of disappearing animals
    let disappearingAnimalsCount = disappearingAnimals?.length;
    //get number of type animals
    let nrType = typeAnimals?.length


    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green'}>
                <span className="d-flex align-items-center">
                    <Link to={'/'} className="d-flex align-items-center">
                            <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                            ZOO
                        </Link>&nbsp;&#62;&nbsp;<Link to={'/about'}>{t('ABOUT_ZOO')}</Link>
                    </span>
            </div>
            <div className="container">
                <h1 className={'text-center margin_top_85_40 color_green f_montserrat f_size_42'}>{t('ABOUT_ZOO')}</h1>
                <Row className={'margin_top_40'}>
                    <Col xs={12} md={6}>
                        <div className={"bg_green m-4"} style={{borderRadius: '88px',}}>
                            <img src={'/zoo_history_about.jpg'}
                                 style={{borderRadius: '78px', paddingLeft: '30px', width: '100%'}}
                                 className={'img-fluid'} alt={'zoo'}/>
                        </div>
                    </Col>
                    <Col  xs={12} md={6}>
                        <div className={"m-4"}>
                            <h1 className={'text-center mt-4'}>{t('TITLE_ABOUT')}</h1>
                            <p className={'margin_top_85_40 lh_27'}>{t('ABOUT_2')}</p>
                            <div className={'d-flex text-center justify-content-center'}>
                                <Button className={'mt-3 lh_27 '}
                                        variant={'outline-success'}>{t('OUR_HISTORY')}</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className={'margin_top_40 bg_light_green'}>
                    <Col>
                        <div className={'p-4'} style={{minHeight: '100px'}}>
                            <div style={{borderRight: '0.1px solid rgba(10, 77, 30, 0.3)', height: "100%"}}
                                 className={'color_green'}>
                                <h2 className={'f_montserrat f_size_42 mb-3'}>{t('ARIA')}</h2>
                                <p>{t('ARIA_1')}</p>
                            </div>
                        </div>
                    </Col>
                    <Col style={{minHeight: '100px'}}>
                        <div className={'p-4 lh_27 color_green'}>
                            <h2 className={'f_montserrat f_size_42 mb-3'}>{t('CLUB')}</h2>
                            <p>{t('CLUB_1')}</p>
                        </div>
                    </Col>
                </Row>
                <Row className={'margin_top_40'}>
                    <h1 className={'text-center margin_top_85_40 color_green f_montserrat f_size_42'}>
                        {t('ABOUT')}
                    </h1>
                    <Row className={'margin_top_40'}>
                        <Col sx={12} md={6}>
                            <div className={"m-4"}>
                                <h1 className={'text-center'}>{t('CHISINAU_ZOO_TITLE')}</h1>
                                <p className={'margin_top_40 lh_27 f_size_18'}>{t('ABOUT_3')}</p>
                                <br/>
                                <br/>
                                {zoo_facilities.map((facility, index) => (
                                    <span key={index}
                                          style={{
                                              whiteSpace: 'nowrap',
                                              display: 'inline-block',
                                              margin: '5px 15px',
                                          }}
                                    >
                                <img src={facility.img} alt={"icon"}/>
                                       <span className={"mr_40 ml_8 font_19"}>&nbsp;{t(facility.title)}</span>
                                    </span>
                                ))}
                                <Row className={'mt-5'}>
                                    <Col md={4} xs={4}>
                                        <h5 className={'color_green'}><img src={'/icons/evernote2.svg'} alt={"icon"}
                                                                           className={'img-fluid'}/>
                                            &nbsp;&nbsp;{totalAnimals}</h5>
                                        {t('ALL_ANIMALS')}
                                    </Col>
                                    <Col md={4} xs={4}>
                                        <h5 className={'color_green'}><img src={'/icons/users.svg'} alt={"icon"}
                                                                           className={'img-fluid'}/>
                                            &nbsp;&nbsp;{nrType}</h5>
                                        {t('TYPE_ANIMALS')}

                                    </Col>
                                    <Col md={4} xs={4}>
                                        <h5 className={'color_green'}><img src={'/icons/user-friends.svg'}
                                                                           alt={"icon"} className={'img-fluid'}/>
                                            &nbsp;{disappearingAnimalsCount}</h5>
                                        <span>{t('DISAPPEARING_ANIMALS')}</span>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sx={12} md={6}>
                            <Row className={'g-0 mt-5'}>
                                <Col xs={12} md={6} className={'show-desktop'}>
                                    <div className={'bg_green p-1 d-flex flex-column justify-content-between h-100'}>
                                        <img src={'/about_img_1.png'} alt={'img'} className={'img-fluid mb-1'}/>
                                        <img src={'/about_img_2.png'} alt={'img'} className={'img-fluid'}/>
                                    </div>
                                </Col>
                                <Col xs={12} md={6}>
                                    <div
                                        className={'bg_green p-1 d-flex align-items-center justify-content-center h-100'}>
                                        <img src={'/about_img_3.png'} alt={'img'} className={'img-fluid'}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Row>
                <div className={'margin_top_40 color_green'}>
                    <h2 className={'text-center'}>{t('DISAPPEARING')}</h2>
                    <p className={'text-center'}>{t('DISAPPEARING_ABOUT')}</p>
                    <div className={'margin_top_40'}>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={isMobile ? 1 : 4}
                            navigation={true}
                            modules={[Navigation]}
                            style={{padding: '0 16px'}} // Slider padding
                        >
                            <Row>
                                {diasappearingAnimals.map((animal) => (
                                    <Col xs={12} md={4} key={animal.id}>
                                        <SwiperSlide key={`slide-${animal.id}`}>
                                            <Link to={`/animals/${animal.id}`}>
                                                <Card className={'bg_light_green'}>
                                                    <Card.Img variant="top"
                                                              src={`${import.meta.env.VITE_URL}/${animal.img_1}`}
                                                              alt="animal"
                                                              className={'img-fluid'}
                                                              style={{height: '230px'}}
                                                    />
                                                    <Card.Footer>
                                                        <p style={{height: '60px'}}>{animal[`name_${language}`]}</p>
                                                    </Card.Footer>
                                                </Card>
                                            </Link>
                                        </SwiperSlide>
                                    </Col>
                                ))}
                            </Row>
                        </Swiper>
                    </div>
                </div>
                <br/>
                <Row className={'color_green'}>
                    <h2 className={'text-center mt-5'}>{t('REVIEWS')}</h2>
                    <p className={'text-center mb-4'}>{t('REVIEWS_LOCAL')}</p>

                    {reviews?.slice(0, 3).map((item) => (
                        <Col xs={12} md={4} key={item.id}>
                            <Card className={'bg_light_green p-4 text-center'}>
                                <div className={'d-flex align-items-center justify-content-center'}>
                                    <img src="/quotes.svg" alt={'quotes'} width={'24px'} className={'img-fluid'}/>
                                </div>
                                <Card.Body>
                                    <p>{item[`long_description_${language}`]}</p>
                                    {/* Map the rating to star images */}
                                    {[...Array(5)].map((_, index) => (
                                        <img
                                            key={index}
                                            src={index < item.rating ? '/icons/star.svg' : '/icons/star_empty.svg'}
                                            alt={index < item.rating ? 'full star' : 'empty star'}
                                            style={{width: '20px', height: '20px', marginRight: '5px'}}
                                        />
                                    ))}
                                </Card.Body>
                            </Card>
                            <div style={{textDecoration: 'underline'}} className={'mt-3 text-center'}>
                                {item[`title_${language}`]}</div>
                            <div style={{fontStyle: 'italic'}} className={'text-center'}>{t('VISITATOR')}</div>
                        </Col>
                    ))}
                </Row>
                <br/>
                <SubscribeNewsForm/>
            </div>

        </div>
    );
};

export default About;