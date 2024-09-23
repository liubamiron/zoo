import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useTranslation} from "../providers";
import {useEffect, useState} from "react";
import {
    fetchAnimalData,
    fetchEventsData,
    fetchHomePageDataById,
    fetchReviewsData,
    fetchTypeAnimals
} from "../utils/apiCalls.js";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation} from 'swiper/modules';
import {zoo_facilities} from "../components/Constants.jsx";


const HomePage = () => {

    const [eventsData, setEventsData] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [allAnimalsData, setAllAnimals] = useState([]);
    const [typeAnimals, setTypeAnimals] = useState([]);
    const [homePageData, setHomePageData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const {t, language} = useTranslation();

    const isMobile = window.matchMedia("only screen and (max-width: 575.98px)").matches;

// get all events
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchEventsData();
                setEventsData(data[0]);  // Store the list of first event
                setAllEvents(data);  // Store the list of first event
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);
// get homepage data by id = 1
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchHomePageDataById(1);
                setHomePageData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };

        getData().then(r => console.log(r, 'homepage data'));
    }, []);
// get all animals
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAnimalData();
                setAllAnimals(data);  // Store the list of animals
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
    let totalAnimals = allAnimalsData.rows?.length;
    // Filter animals where disappearing is true
    let disappearingAnimals = allAnimalsData?.rows?.filter(animal => animal.disappearing === true);
// Get the count of disappearing animals
    let disappearingAnimalsCount = disappearingAnimals?.length;
    //get number of type animals
    let nrType = typeAnimals?.length

    // Get today's date in the 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];
// Filter events where today's date is within the start and end date
    const activeEvents = allEvents
        .filter(event => {
            const startDate = event.start_date_event.split('T')[0];
            const endDate = event.end_date_event.split('T')[0];

            // Check if the current date is greater than or equal to start_date_event and less than or equal to end_date_event
            return today >= startDate && today <= endDate;
        })
        .sort((a, b) => new Date('1970/01/01 ' + a.time_event.split(' - ')[0]) - new Date('1970/01/01 ' + b.time_event.split(' - ')[0]));

// Filter animals by selected type
    const filteredAnimals = selectedType
        ? allAnimalsData?.rows?.filter((animal) => animal.typeAnimalId === selectedType)
        : allAnimalsData?.rows;

    // Filter the animals array where new_animal is true
    const newAnimals = allAnimalsData?.rows?.filter(animal => animal.new_animal === true);
// Display the result
    console.log('newAnimals', newAnimals, allAnimalsData?.rows?.filter(animal => animal.new_animal === true))


    const CardComponent = () => (
        <>
            <Card className="mb-3 h-100 card1_style">
                <Card.Body className="text-center ">
                    <Card.Title className={'d-flex justify-content-center color_green mb-4'}>
                        <img src={'/icons/Vector.svg'} alt={'vector'} style={{width: '7%', height: 'auto'}} />
                        &nbsp;{eventsData[`title_${language}`]}
                    </Card.Title>
                    <Card.Text className={'height_27'}>
                        {new Date().toLocaleDateString(`${language}`, {
                            month: 'long',
                            day: 'numeric'
                        })} <br />
                        {eventsData.time_event}<br />
                        {eventsData[`short_description_${language}`]}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className={'color_green'}>{t("PLAIN")}</Card.Footer>
            </Card>
        </>
    );

    const CardComponent2 = () => (
        <>
            <Card className="mb-4 card1_style h-100">
                <Card.Body>
                    <Card.Title
                        className={'d-flex justify-content-center color_green  mb-4'}>
                        <img src={'/icons/map.svg'} alt={'vector'}
                             style={{width: '7%', height: 'auto'}}/>
                        &nbsp;{t('MAP')}
                    </Card.Title>
                    <Card.Text className={'height_27'}>
                        <img src={'/map_img.svg'} alt={'vector'}/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>{t('ZOO_MAP')}</Card.Footer>
            </Card>
        </>
    )

    const CardComponent3 = () => (
        <Card className="mb-4 card1_style h-100"
            >
                <Card.Body>
                    <Card.Title
                        className={'d-flex justify-content-center color_green mb-4'}>
                        <img src={'/icons/apple-alt.svg'} alt={'apple-alt'}
                             style={{width: '7%', height: 'auto'}}/>
                        &nbsp;{t('NEW_ANIMALS')}
                    </Card.Title>
                    <Card.Text
                        className={'height_27'}>{t('NEW_ANIMALS_INFO')}</Card.Text>
                </Card.Body>
                <Card.Footer>{t('MORE')}</Card.Footer>
            </Card>
    )
    const CardComponent4 = () => (
        <Card className="mb-4 card1_style h-100"
        >
            <Card.Body>
                <Card.Title
                    className={'d-flex justify-content-center color_green mb-4'}>
                    <img src={'/icons/evernote.svg'} alt={'apple-alt'}
                         style={{width: '7%', height: 'auto'}}/>
                    &nbsp;{t('EVENTS')}
                </Card.Title>
                <Card.Text className={'height_27'}>{t('EVENTS_INFO')}</Card.Text>
            </Card.Body>
            <Card.Footer>{t('ALL_EVENTS')}</Card.Footer>
        </Card>
    )

    const CardList = () => (
        <Row className="d-flex align-items-stretch bg_gray_zoo" style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#F1F3F0'
        }}>
            <Col xs='12' md='3' className={'no_padding mb-4'}>
                <CardComponent />
            </Col>
            <Col xs='12' md='3' className={'no_padding mb-4'}>
                <CardComponent2 />
            </Col>
            <Col xs='12' md='3' className={'no_padding mb-4'}>
                <CardComponent3 />
            </Col>
            <Col xs='12' md='3' className={'no_padding mb-4'}>
                <CardComponent4 />
            </Col>
        </Row>
    );

    const MobileSlider = () => (
        <Swiper
            spaceBetween={30}
            slidesPerView={1} // or 2 for a multi-card slider
            navigation={true}
            modules={[Navigation]}
            style={{ padding: '0 16px' }} // Slider padding
        >
            <SwiperSlide>
                <CardComponent />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent2 />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent3 />
            </SwiperSlide>
            <SwiperSlide>
                <CardComponent4 />
            </SwiperSlide>
            {/* More SwiperSlides as needed */}
        </Swiper>
    );

    const CardsContainer = () => (
        // <div style={{ margin: '180px 21px -20px' }}>
        <div >
            {isMobile ? <MobileSlider /> : <CardList />}
        </div>
    );


    return (
        <>
            <div className={'z2'}>
                <div className={'background_green'}>
                    <div className={'background_white'}>
                        <Container>
                            <div style={{textAlign: 'center'}}>
                                <h1 className={'f_montserrat title'}>
                                    {t('GARDEN')} <br/> {t('ZOOLOGIC')}
                                </h1>
                                <div className={'pad_top_95'}>
                                    <Button variant="outline-light" className={'btn_by'}>
                                        {t('BY_TICKET')}
                                    </Button>
                                    <Button variant="outline-light" className={'btn_by'}>
                                        Донат
                                    </Button>
                                </div>
                            </div>
                            <div style={{margin: '180px 21px -20px'}}>
                                <CardsContainer/>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
            <div className={'background_white2'} style={{height: '124px'}}>&nbsp;
            </div>
            {/*new animals block*/}
            <Row>
                <Col xs={12} md={3}>
                    <Card>
                        <Card.Body className="text-center ">
                            <Card.Title
                                // className={'d-flex justify-content-center color_green mb-4'}>
                                className={'color_green mb-4'}>
                                {homePageData[`title1_${language}`]}
                            </Card.Title>
                            <Card.Text className={'height_27'}>
                                {homePageData[`description1_${language}`]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={9}>
                    <div>
                        <Swiper
                            slidesPerView={isMobile ? 1 : 2.5}
                            spaceBetween={10}
                            navigation={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {newAnimals?.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card className="mb-3 h-100">
                                    <Card.Img variant="top"
                                     src={`${import.meta.env.VITE_URL}/${item.img_1}`} alt="animal"
                                         className={'img-fluid'}/>
                                    <Card.Body className="text-center bg_green">
                                        <Card.Title className={'mb-4 text_white'}>
                                            {item[`name_${language}`]}
                                        </Card.Title>
                                        <Card.Text className={'height_27 text_white'}>
                                            {item[`descr_short_${language}`]}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className={'bg_green text_white'}>
                                        {t("MORE_INFO")}
                                    </Card.Footer>
                                </Card>
                            </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Col>
            </Row>
            {/*about zoo*/}
            <div className={'bg_shape2'}>
                <div className={'container'}>
                    <h3 className={'color_green text-center padtop_125_25'}>{homePageData[`title_${language}`]}</h3>
                    <Row>
                        <Col sx={12} md={6}>
                            <Row className={'pad_top_55_15'}>
                                <Col>
                                    <img src={`${import.meta.env.VITE_URL}/${homePageData.img_2}`} alt="zoo"
                                         className={'img-fluid'}/>
                                    <img src={`${import.meta.env.VITE_URL}/${homePageData.img_3}`} alt="zoo"
                                         className={'img-fluid'}/>
                                </Col>
                                <Col>
                                    <img src={`${import.meta.env.VITE_URL}/${homePageData.img_1}`} alt="zoo"
                                         className={'img-fluid'}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sx={12} md={6}>
                            <Row className={'pad_top_55_15'}>
                                <Col>
                                    <h3 className={'color_green mb-4'}>{homePageData[`short_description_${language}`]}</h3>
                                    <p>{homePageData[`long_description_${language}`]}</p>
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
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <br/>
            <br/>
            {/*today in zoo*/}
            <div className={'container'}>
                <Row className={'mt-5 mb-5'}>
                    <Col xs={12} md={6} className="d-flex align-items-stretch">
                        <div className={'bg_gray text-center p-5 position-relative w-100'}>
                            <img
                                src="/bird.png"
                                alt="corner image"
                                className="position-absolute"
                                style={{top: '-45px', right: '15px'}}
                            />
                            <h3>{t('TODAY_ON_ZOO')}</h3>
                            <br/>
                            <div className="row">
                                {activeEvents.map((event) => (
                                    <div className="col-12 mb-3" key={event.id}>
                                        <div className="row">
                                            <div className="col-6">
                                                <strong>{event.time_event}</strong>
                                            </div>
                                            <div className="col-6">
                                                <span>{event.title_ru}</span>
                                            </div>
                                            <hr/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br/>
                            <span>{t('All_EVENTS_TODAY')}&nbsp;<img src={'/icons/arrow_green.svg'}
                                                                    alt={'arrow'}/></span>
                        </div>
                    </Col>
                    <Col sx={12} md={6} className="d-flex align-items-stretch">
                        <div className={'bg_green p-5 color_white position-relative w-100'}>
                            <h3 className={'text-center '}>{t('VISITORS')}</h3>
                            <br/>
                            <img
                                src="/snake.png"
                                alt="corner image"
                                className="position-absolute"
                                style={{top: '-13px', right: '0'}}
                            />
                            <img
                                src="/giraf.png"
                                alt="corner image"
                                className="position-absolute"
                                style={{bottom: '0', right: '0'}}
                            />
                            <p>{t('INFO_BEFORE_VISIT')}</p>
                            <p className={'color_yellow'}>{t('INFO_1')}&nbsp; <img src={'/icons/arrow_gold.svg'}/></p>
                            <p className={'color_yellow'}>{t('INFO_2')}&nbsp; <img src={'/icons/arrow_gold.svg'}/></p>
                            <p className={'color_yellow'}>{t('INFO_3')}&nbsp; <img src={'/icons/arrow_gold.svg'}/></p>
                            <br/>
                            <p><img src={'/icons/map-marker-alt.svg'} alt={'map'}/>&nbsp; {t('HOW_TO')}</p>
                            <br/>
                            <br/>
                            <p>{t('MAP_DIRECTIONS')}&nbsp; <img src={'/icons/arrow_gold.svg'}/></p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {activeEvents
                        .filter(
                            (event) => event.title_ru !== "Открытие" && event.title_ru !== "Закрытие"
                        )
                        .slice(0, 4) // Get the first four events after filtering
                        .map((event) => {
                            const eventDate = new Date(event.start_date_event);
                            const options = {month: 'long', day: 'numeric'}; // Format options for month and day
                            const formattedDate = eventDate.toLocaleDateString('ro-RO', options); // Change locale as needed

                            return (
                                <Col xs={12} md={3} key={event.id}>
                                    <div
                                        className={'bg_green p-3 text-center color_white d-flex flex-column justify-content-between min-height-262'}>
                                        <Row>
                                            <Col xs={12} md={7}>
                                                &nbsp;
                                            </Col>
                                            <Col xs={12} md={5} className={'bg_yellow'}>
                                                <strong>{formattedDate}</strong>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <strong>{event[`title_${language}`]}</strong>
                                    </div>
                                </Col>
                            );
                        })}
                    <br/>
                </Row>
                <br/>
                <div className={'text-center'}>{t('ALL_EVENTS')}&nbsp;
                    <img src={'/icons/arrow_green.svg'} alt={'arrow'}/>
                </div>
            </div>
            <div className="bg_shape2 mt-5">
                <div className="container">
                    <h2 className="text-center">Animal Gallery</h2>
                    <br/>
                    <div className="text-center mb-4">
                        {typeAnimals.map((type) => (
                            <Button
                                key={type.id}
                                variant="outline-success"
                                onClick={() => setSelectedType(type.id)}
                                className="m-2"
                            >
                                {type.name_ru}
                            </Button>
                        ))}
                        <Button
                            variant="outline-danger"
                            onClick={() => setSelectedType(null)}
                            className="m-2"
                        >
                            Show All
                        </Button>
                    </div>
                    <Row>
                        {filteredAnimals?.slice(0, 6).map((animal) => (
                            <Col xs={12} md={6} lg={4} key={animal.id}>
                                <div className="animal-card p-3 text-center">
                                    <img
                                        src={`${import.meta.env.VITE_URL}/${animal.img_1}`}
                                        alt="Animal Image 2"
                                        className="img-fluid"
                                    />
                                    <h5>{animal[`name_${language}`]}</h5>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <br/>
                    <p className={'text-center'}>{t('SEE_ALL')}&nbsp; <img src={'/icons/arrow_green.svg'}
                                                                           alt={'arrow'}/></p>
                    <br/>
                    <h2>{t('BUY_TICKET')}</h2>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                        Velit officia consequat duis enim velit mollit.</p>

                    <Row className="mt-4 d-flex align-items-stretch">
                        <Col xs={12} md={4} className="p-2">
                            <div className="color_green ticket_bg d-flex flex-column h-100">
                                <div className="p-4">
                                    <h3>{t('ADULTS')}</h3>
                                    <br/>
                                    {t('PRICE')}
                                    <span style={{display: 'flex', alignItems: 'center'}} className="mt-2">
                    <h2 style={{marginRight: '8px'}}>30</h2>
                                        {t('LEI')}/{t('HUMAN')}
                </span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_1')}</span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_2')}</span>
                                    <br/>
                                </div>
                                <div className="d-flex justify-content-center mt-auto">
                                    <Button variant="outline-success" className="mb-2">{t('BUY_TICKET')}</Button>
                                </div>
                            </div>

                        </Col>
                        <Col xs={12} md={4} className="p-2">
                            <div className="color_green d-flex flex-column h-100 ticket_bg">
                                <div className="p-4">
                                    <h3>{t('CHILD')}</h3>
                                    <br/>
                                    {t('PRICE')}
                                    <span style={{display: 'flex', alignItems: 'center'}} className="mt-2">
                    <h2 style={{marginRight: '8px'}}>30</h2>
                                        {t('LEI')}/{t('CHILD_1')}
                </span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_3')}</span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_4')}</span>
                                    <br/>
                                </div>
                                <div className="d-flex justify-content-center mt-auto">
                                    <Button variant="outline-success" className="mb-2">{t('BUY_TICKET')}</Button>
                                </div>
                            </div>

                        </Col>
                        <Col xs={12} md={4} className="p-2">
                            <div className="ticket_bg_dark text_white d-flex flex-column h-100">
                                <div className="p-4">
                                    <h3>{t('GROUP')}</h3>
                                    <br/>
                                    <p>{t('BOOK_GROUP')}</p>
                                    <span style={{display: 'flex', alignItems: 'center'}} className="mt-2">
                                        <h2 style={{marginRight: '8px', color: '#FCC044'}}>25%</h2></span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_5')}</span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_6')}</span>
                                    <br/>
                                    <span className="mt-2">* - {t('PRICE_7')}</span>
                                </div>
                                <div className="d-flex justify-content-center mt-auto">
                                    <Button className="mb-2" style={{ backgroundColor: '#FCC044', border:'none'}}>{t('BUY_TICKET')}</Button>
                                </div>
                            </div>
                            <br/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <h2 className={'text-center mt-5'}>{t('REVIEWS')}</h2>
                        <p className={'text-center mb-4'}>{t('REVIEWS_LOCAL')}</p>

                        {reviews?.slice(0, 6).map((item) => (
                        <Col xs={12} md={4} key={item.id}>
                            {/* Map the rating to star images */}
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index < item.rating ? '/icons/star.svg' : '/icons/star_empty.svg'}
                                    alt={index < item.rating ? 'full star' : 'empty star'}
                                    style={{ width: '20px', height: '20px', marginRight: '5px' }}
                                />
                            ))}
                            <br/>
                            <br/>
                            <p>{item[`long_description_${language}`]}</p>
                            {item[`title_${language}`]}
                            <p>{t('VISITATOR')}</p>
                        </Col>
                            ))}
                    </Row>
                </div>
            </div>
        </>
    );
};

export default HomePage;