import {Link, useParams} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {useEffect, useState} from "react";
import {fetchAnimalData, fetchAnimalDataById, fetchEventsData} from "../utils/apiCalls.js";
import {Accordion, Button, Col, Form, Image, Row} from "react-bootstrap";


const Animal = () => {
    const {id} = useParams(); // Get the animal ID from the URL
    const [allEvents, setAllEvents] = useState([]);
    // const [filteredAnimalsByType, setFilteredAnimalsByType] =useState([])
    const {t, language} = useTranslation();
    const [emailUser, setEmailUser] = useState([]);
    const [animalsData, setAnimalsData] = useState([]);
    const [groupedAnimals, setGroupedAnimals] = useState([]);

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
    // Get all animals and filter by current animal's types
//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const data = await fetchAnimalData(); // Fetch all animals data from API
//                 const currentAnimalData = await fetchAnimalDataById(id); // Fetch the current animal data by ID
//                 const filteredAnimals = filterAnimalsByCurrentTypes(data.rows, currentAnimalData.types); // Filter animals that have the same types
//
//                 groupAnimalsByType(filteredAnimals); // Group animals by their types
//             } catch (error) {
//                 console.error('Error fetching animals data:', error);
//             }
//         };
//         getData();  // Call the async function
//     }, []);
//
// // Filter animals that share the same types as the current animal
//     const filterAnimalsByCurrentTypes = (allAnimals, currentAnimalTypes) => {
//         const currentTypeIds = currentAnimalTypes.map(type => type.id);
//
//         return allAnimals.filter(animal =>
//             animal.types.some(type => currentTypeIds.includes(type.id))
//         );
//     };
//
// // Group animals by their types
//     const groupAnimalsByType = (animals) => {
//         const grouped = {};
//
//         animals.forEach((animal) => {
//             animal.types.forEach((type) => {
//                 if (!grouped[type.id]) {
//                     grouped[type.id] = {
//                         typeName: type[`name_${language}`], // Adjust for the current language
//                         animals: [],
//                     };
//                 }
//                 // Optionally exclude the current animal from the group
//                 if (animal.id !== id) {
//                     grouped[type.id].animals.push(animal);  // Add animal to the corresponding type
//                 }
//             });
//         });
//
//         setFilteredAnimalsByType(grouped); // Update state with grouped animals
//     };

    // Get all animals adn filter bu  type
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const data = await fetchAnimalData();  // Fetch data from API
    //             const animalDataById = await fetchAnimalDataById(id);  // Fetch specific animal by ID (http://localhost:5000/api/animal/:id)
    //             groupAnimalsByType(data.rows, animalDataById.types);  // Group animals by their corresponding types
    //         } catch (error) {
    //             console.error('Error fetching animals data:', error);
    //         }
    //     };
    //     getData();
    // }, []);

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

// Group animals by their types that match the types from animalById
//     const groupAnimalsByType = (animals, animalTypesById) => {
//         const grouped = {};
//
//         // Filter animals to only include those whose types match animalTypesById
//         animals.forEach((animal) => {
//             const matchedTypes = animal.types.filter(type =>
//                 animalTypesById.some(animalType => animalType.id === type.id)
//             );
//
//             matchedTypes.forEach((type) => {
//                 if (!grouped[type.id]) {
//                     grouped[type.id] = {
//                         typeName: type[`name_${language}`],
//                         animals: [],
//                     };
//                 }
//                 grouped[type.id].animals.push(animal);  // Add animal to the corresponding type
//             });
//         });
//
//         setFilteredAnimalsByType(grouped); // Update state with grouped animals
//     };

    console.log('gp', groupedAnimals)
    return (
        <>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/animals'}>{t('ANIMALS')}</Link>
                </span>
                </div>
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
                            {activeEvents
                                .map((event) => (
                                    <>
                                        <Row key={event.id}>
                                            <Col>
                                                <div className={'d-flex align-items-center p-2'}>
                                                    <img src="holder.js/100px180" alt={'img'}/>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className={'p-1'}>
                                                    <div
                                                        className={'text-center color_green'}>{event[`title_${language}`]}</div>
                                                    <p className={'text-center color_green mt-2'}>{event.start_date_event}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr/>
                                    </>
                                ))}
                        </div>
                    </Col>
                </Row>
                <br/>
            </div>
                <div className={'bg_shape2 pt-5'}>

                    {/*<div className="container mt-5">*/}
                    {/*    {Object.keys(filteredAnimalsByType).map((typeId) => (*/}
                    {/*        <div key={typeId}>*/}
                    {/*            <h3 className="text-center my-4"> {t('OTHER')} {filteredAnimalsByType[typeId].typeName}</h3>*/}
                    {/*            <Row>*/}
                    {/*                {typeId}*/}
                    {/*                {filteredAnimalsByType[typeId].animals.map((animal, idx) => (*/}
                    {/*                    <Col key={idx} xs={6} sm={4} md={3} className="mb-4">*/}

                    {/*                        <Image*/}
                    {/*                            src={`${import.meta.env.VITE_URL}/${animal.img_1}`}*/}
                    {/*                            alt={animal[`name_${language}`]}*/}
                    {/*                            fluid*/}
                    {/*                            style={{height: '200px', width: '100%', objectFit: 'cover'}}*/}
                    {/*                        />*/}
                    {/*                        <div className="mt-2 text-center">*/}
                    {/*                            <h5>{animal[`name_${language}`]}</h5>*/}
                    {/*                            <p>{animal[`descr_short_${language}`]}</p>*/}
                    {/*                        </div>*/}
                    {/*                    </Col>*/}
                    {/*                ))}*/}
                    {/*            </Row>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}

                    <div className={'container'}>
                    <Row className={ "mb-5"}>
                        {/* Check if animal is defined before accessing its properties */}
                        <h2 className={'mt-5 mb-5 text-center'}>
                            {t('OTHER_SPECIES_FROM')}&nbsp;{groupedAnimals[0]?.[`clas_${language}`]}
                        </h2>
                        {groupedAnimals?.map((animal) => (
                            <Col xs={12} md={4} key={animal.id}>
                                <Image
                                    src={`${import.meta.env.VITE_URL}/${animal.img_1}`}
                                    alt={animal[`name_${language}`]}
                                    fluid
                                    style={{height: '100%', objectFit: 'cover'}}
                                />
                                <i className={'color_green'}>{animal[`name_${language}`]}</i>
                                <p className={'mt-1'}>{animal[`descr_short_${language}`]}</p>
                            </Col>
                        ))}

                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <Row  className={'bg_green p-3 mt-5'}>
                        <Col>
                            <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
                        </Col>
                        <Col>
                            <Row className={'color_white mt-4'}>
                                <Col>
                                    <Form.Group controlId="nameEN">
                                        <Form.Control
                                            type="email"
                                            value={emailUser}
                                            onChange={(e) => setEmailUser(e.target.value)} // Use a function to update state
                                            placeholder={t('ENTER_EMAIL')}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button variant={'outline-warning'}>{t('SUBSCRIBE')}</Button>
                                </Col>
                                <div className={'mt-2 '} style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_1')}</div>
                                <div style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_2')}</div>
                            </Row>
                        </Col>
                    </Row>
                    </div>
                </div>
        </>
    )
        ;
};

export default Animal;