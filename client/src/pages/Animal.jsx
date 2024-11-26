import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {useEffect, useState} from "react";
import {fetchAnimalData, fetchAnimalDataById, fetchEventsData} from "../utils/apiCalls.js";
import {Accordion, Button, Card, Col, Image, Row} from "react-bootstrap";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";


const Animal = () => {
    const {id} = useParams(); // Get the animal ID from the URL
    const [allEvents, setAllEvents] = useState([]);
    const {t, language} = useTranslation();
    const [animalsData, setAnimalsData] = useState([]);
    const [groupedAnimals, setGroupedAnimals] = useState([]);
    const navigate = useNavigate();
    const isMobile = window.matchMedia("only screen and (max-width: 575.98px)").matches;

    // Get animal by id
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAnimalDataById(id);
                setAnimalsData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData();
    }, [id]);

    // get all events
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchEventsData();

                setAllEvents(data);  // Store the list of first event
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };
        getData();
    }, []);

    // Filter events where today's date is within the start and end date
    const activeEvents = allEvents
        .filter(event => {
            const startDate = event.start_date_event.split('T')[0];
            const endDate = event.end_date_event.split('T')[0];
            const today = new Date().toISOString().split('T')[0];

            // Filter active events that are not 'Close' or 'Opening'
            return today >= startDate && today <= endDate &&
                event.title_en !== "Close" && event.title_en !== "Opening";
        })
        .sort((a, b) => new Date('1970/01/01 ' + a.time_event.split(' - ')[0]) -
            new Date('1970/01/01 ' + b.time_event.split(' - ')[0]));

    // get all animals and filter by clas_ro
    useEffect(() => {
        const getData = async () => {
            try {
                const allAnimalsData = await fetchAnimalData();  // Fetch all animals data
                const animalById = await fetchAnimalDataById(id);  // Fetch specific animal by ID

                // Group animals by `clas_ro` matching the one in `animalById`
                const filteredAnimals = allAnimalsData.rows.filter(animal => animal.clas_ro === animalById.clas_ro);

                setGroupedAnimals(filteredAnimals);  // Assuming you want to store them in a state
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };

        getData();
    }, [id]);

    console.log('gp', groupedAnimals)
    return (
        <>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green'}>
                <span className="d-flex align-items-center">
                    <Link to={'/'} className="d-flex align-items-center">
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/animals'}>{t('ANIMALS')}</Link>
                </span>
            </div>
            <div className="container">
                <h2 className={'text-center mt-5 color_green f_size_42'}>{animalsData[`name_${language}`]}</h2>
                <Row className={'mt-5'}>
                    <Col xs={12} md={6} className={'mb-2'}>
                        <img src={`${import.meta.env.VITE_URL}/${animalsData.img_1}`} alt="animal"
                             className={'img-fluid'}/>
                    </Col>
                    <Col className={'f_size_18'} xs={12} md={6}>
                        <h2 className={'text-center mt-1 color_green'}>{t('TYPE_CHARACTERISTICS')}</h2>
                        <div className={'mt-5 mb-3 color_green'}>
                            <strong
                                className={'f_weight_600'}>{t('HABITAT')}</strong>:
                            &nbsp;{animalsData[`habitat_${language}`] ? animalsData[`habitat_${language}`] : '\u00A0'}
                        </div>
                        <div className={'mt-2 mb-3 color_green'}>
                            <strong
                                className={'f_weight_600'}>{t('FAMILY')}</strong>: &nbsp;{animalsData[`family_${language}`]}
                        </div>
                        <div className={'mt-2 mb-3 color_green'}>
                            <strong
                                className={'f_weight_600 f_size_18'}>{t('GENUS')}</strong>: &nbsp;{animalsData[`genus_${language}`]}
                        </div>
                        <div className={'mt-2 mb-3 color_green'}>
                            <strong
                                className={'f_weight_600 f_size_18'}>{t('PHYLUM')}</strong>: &nbsp;{animalsData[`phylum_${language}`]}
                        </div>
                        <div className={'mt-2 mb-3 color_green'}>
                            <strong
                                className={'f_weight_700 f_size_18'}>{t('CLASS')}</strong>: &nbsp;{animalsData[`clas_${language}`]}
                        </div>
                        <div className={'mt-2 mb-3 color_green'}>
                            <strong
                                className={'f_weight_600 f_size_18'}>{t('DOMAIN')}</strong>: &nbsp;{animalsData[`domain_${language}`]}
                        </div>
                        <div className={'mt-2 color_green'}>
                            <strong
                                className={'f_weight_600 f_size_18'}>{t('KARYOTYPE')}</strong>: &nbsp;{animalsData[`karyotype_${language}`]}
                        </div>

                    </Col>
                </Row>
                <Row className={'mt-5'}>
                    <Col xs={12} md={8}>
                        <div>
                            <Accordion defaultActiveKey={['0']} alwaysOpen className="custom-accordion">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>{t('AREAL_POPULATION')}</Accordion.Header>
                                    <Accordion.Body>
                                        {animalsData[`habitat_long_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>{t('GENERAL_INFO')}</Accordion.Header>
                                    <Accordion.Body>
                                        {animalsData[`general_info_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>{t('NUTRITION')}</Accordion.Header>
                                    <Accordion.Body>
                                        {animalsData[`nutrition_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>{t('COMMUNICATION')}</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Body>
                                            {animalsData[`protection_${language}`]}
                                        </Accordion.Body>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>{t('PROTECTION')}</Accordion.Header>
                                    <Accordion.Body>
                                        {animalsData[`conservation_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="5">
                                    <Accordion.Header>{t('FACTS')}</Accordion.Header>
                                    <Accordion.Body>
                                        {animalsData[`facts_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className={'bg_yellow_green p-4'}>
                            <h2 className={'care_style color_green f_weight_700'}>{t("CARE_1")}</h2>
                            <p className={' color_green'}>{t("CARE_2")}</p>
                            <div>
                                <Button variant={"outline-success"} className={'mt-2'}>{t("CARE_BTN")}</Button>
                            </div>
                        </div>
                        <br/>
                        <div className={'bg_light_green p-3'}>
                            <h2 className={'mt-3 color_green '}>{t("EVENTS_INFO")}</h2>
                            <br/>
                            {activeEvents.map((event) => (
                                <div key={event.id}
                                    // onClick={() => navigate(`/events/${event.id}`)}
                                     onClick={() => navigate(`/events`)}
                                >
                                    <Row>
                                        <Col xs={6} md={5} className="p-0">
                                            <div className="d-flex align-items-center">
                                                <Image
                                                    src={`${import.meta.env.VITE_URL}/${event.img}`}
                                                    alt={event[`title_${language}`]}
                                                    className="img-fluid"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={6} md={7} className="d-flex flex-column justify-content-between">
                                            <div className="text-center color_green">{event[`title_${language}`]}</div>
                                            <div className="text-center color_green mt-2">{event.start_date_event}</div>
                                        </Col>
                                    </Row>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
                <br/>
            </div>
            <div className={'bg_shape2 pt-5'}>
                <div className={'container'}>
                    <Row className={"mb-5"}>
                        {/* Check if animal is defined before accessing its properties */}
                        <h2 className={'mt-5 mb-5 text-center'}>
                            {t('OTHER_SPECIES_FROM')}&nbsp;{groupedAnimals[0]?.[`clas_${language}`]}
                        </h2>
                        <div className={'margin_top_40'}>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={isMobile ? 1 : 4}
                                navigation={true}
                                modules={[Navigation]}
                                style={{padding: '0 16px'}} // Slider padding
                            >
                                <Row>
                                    {groupedAnimals?.map((animal) => (
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
                                                            <i className={'color_green'}>{animal[`name_${language}`]}</i>
                                                        </Card.Footer>
                                                    </Card>
                                                </Link>
                                            </SwiperSlide>
                                        </Col>
                                    ))}
                                </Row>
                            </Swiper>
                        </div>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <SubscribeNewsForm/>
                </div>
            </div>
        </>
    )
        ;
};

export default Animal;