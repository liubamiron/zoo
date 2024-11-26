import {useTranslation} from "../providers/index.js";
import {useEffect, useState} from "react";
import {createEmailSubscribe, fetchAnimalData, fetchTypeAnimals} from "../utils/apiCalls.js";
import {Link} from "react-router-dom";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.jsx";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";


const Animals = () => {
    const {t, language} = useTranslation();
    const [allAnimalsData, setAllAnimals] = useState([]);
    const [typeAnimals, setTypeAnimals] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Show 9 animals per page

    // Get all animals
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

    // Get type of animals
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTypeAnimals();
                setTypeAnimals(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'type animals data'));
    }, []);

    // Filter animals by selected type
    const filteredAnimals = selectedType
        ? allAnimalsData?.rows.filter(animal => animal?.types.some(animal => animal.id === selectedType))
        : allAnimalsData?.rows;

    // Calculate the animals to be displayed on the current page
    const indexOfLastAnimal = currentPage * itemsPerPage;
    const indexOfFirstAnimal = indexOfLastAnimal - itemsPerPage;
    const currentAnimals = filteredAnimals?.slice(indexOfFirstAnimal, indexOfLastAnimal) || [];

    // Calculate total pages
    const totalPages = Math.ceil((filteredAnimals?.length || 0) / itemsPerPage);

    return (<>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
            </div>
            <div className="mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green">
                <span className="d-flex align-items-center">
                    <Link to="/" className="d-flex align-items-center">
                        <img
                            src="/house.svg"
                            className="img-fluid"
                            alt="house"
                            style={{marginRight: '5px'}}
                        />
                        ZOO
                    </Link>
                    &nbsp;&#62;&nbsp; <Link to="/animals">{t('ANIMALS')}</Link>
                </span>
            </div>
            <Row className={'margin_top_40'}>
                <div className="text-center mb-4">
                    <Button
                        variant="outline-success"
                        onClick={() => setSelectedType(null)}
                        className={`m-2 ${selectedType === null ? 'active' : ''}`} // Make active when showing all animals
                    >
                        {t('ALL')}
                    </Button>
                    {typeAnimals?.map((type) => (
                        <Button
                            key={type.id}
                            variant="outline-success"
                            onClick={() => setSelectedType(type.id)}
                            className={`m-2 ${selectedType === type.id ? 'active' : ''}`} // Make active if selected
                        >
                            {type[`name_${language}`]}
                        </Button>
                    ))}
                </div>
                <div className={'container mt-5'}>
                    <Row>
                        {currentAnimals?.map((animal) => (
                            <Col xs={12} md={4} key={animal.id}> {/* Changed to 4 for 3 items per row */}
                                <Link to={`/animals/${animal.id}`}
                                      style={{textDecoration: 'none'}}> {/* Wrap Card with Link */}
                                    <Card className={'bg_light_green mb-2'}>
                                        <div className={'bg_green'}>
                                            <Card.Img variant="top"
                                                      src={`${import.meta.env.VITE_URL}/${animal.img_1}`} alt="animal"
                                                      className={'img-fluid'}
                                                      style={{height: '230px'}}
                                            />
                                        </div>
                                        <Card.Footer>
                                            <p style={{height: '60px'}}>{animal[`name_${language}`]}</p>
                                        </Card.Footer>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Row>
            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <br/>
            <div className={'container mt-5'}>
                <h2 className={'text-center'}>{t('BUY_TICKET')}</h2>
                <p className={'text-center'}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
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
                                    <h2 style={{marginRight: '8px', color: '#FCC044'}}>25%</h2>
                                </span>
                                <br/>
                                <span className="mt-2">* - {t('PRICE_5')}</span>
                                <br/>
                                <span className="mt-2">* - {t('PRICE_6')}</span>
                                <br/>
                                <span className="mt-2">* - {t('PRICE_7')}</span>
                            </div>
                            <div className="d-flex justify-content-center mt-auto">
                                <Button className="mb-2"
                                        style={{backgroundColor: '#FCC044', border: 'none'}}>{t('BUY_TICKET')}</Button>
                            </div>
                        </div>
                        <br/>
                    </Col>
                </Row><br/>
                {/* Use the subscribe form component */}
                <SubscribeNewsForm/>
            </div>
        </>
    );
};

export default Animals;
