import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import PaginationComponent from "../components/PaginationComponent.jsx";
import {useTranslation} from "../providers/index.js";
import {createEmailSubscribe, fetchAnimalData, fetchTypeAnimals} from "../utils/apiCalls.js";

function Gallery() {
    const {t, language} = useTranslation();
    const [allAnimalsData, setAllAnimals] = useState([]);
    const [typeAnimals, setTypeAnimals] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [emailUser, setEmailUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 14;
    const [responseMessage, setResponseMessage] = useState('');


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
        ? allAnimalsData?.rows.filter(animal => animal.types.some(animal => animal.id === selectedType))
        : allAnimalsData?.rows;

    // Calculate the animals to be displayed on the current page
    const indexOfLastAnimal = currentPage * itemsPerPage;
    const indexOfFirstAnimal = indexOfLastAnimal - itemsPerPage;
    const currentAnimals = filteredAnimals?.slice(indexOfFirstAnimal, indexOfLastAnimal) || [];

    // Calculate total pages
    const totalPages = Math.ceil((filteredAnimals?.length || 0) / itemsPerPage);

    // Prepare photos for PhotoAlbum component with different sizes for different rows
    const photos = currentAnimals.map((item, index) => ({
        src: `${import.meta.env.VITE_URL}/${item.img_1}`,
        width: (index % 1 === 0) ? 200 : 300,  // Set varying width based on index
        height: (index % 3 === 0) ? 100 : 200,  // Set varying height based on index
        alt: item[`name_${language}`],
    }));

    // send email address for subscribe
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const data = await createEmailSubscribe({ email: emailUser }); // Call the createEmailSubscribe function
            setResponseMessage(data.message || 'Email sent successfully!'); // Set the response message
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to send email. Please try again.');
        }
    };

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;{t('GALLERY')}
                </span>
                </div>
            </div>
        <br/>
            <h2 className={"mt-4 mb-4 text-center color_green"}>{t('ZOO_GALLERY')}</h2>
            <p className={'text-center'}>{t('ALL_ANIMALS_GALLERY')}</p>
            <Row className={'margin_top_40'}>
                <div className="text-center mb-4">
                    <Button
                        variant="outline-success"
                        onClick={() => setSelectedType(null)}
                        className={`m-2 ${selectedType === null ? 'active' : ''}`} // Make active when showing all animals
                    >
                        {t('ALL')}
                    </Button>
                    {typeAnimals.map((type) => (
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
                <div className="container">
                    <RowsPhotoAlbum layout="rows" photos={photos}/> {/* Correct usage of PhotoAlbum */}
                    <br/>
                </div>
            </Row>

            {/* Pagination */}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <br/>
            <br/>
            <div className={'container mt-5'}>
                <Row  className={'bg_green p-3 mt-5'}>
                    <Col>
                        <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
                    </Col>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Row className={'color_white mt-4'}>
                                <Col>
                                    <Form.Group controlId="email">
                                        <Form.Control
                                            type="email"
                                            value={emailUser}
                                            onChange={(e) => setEmailUser(e.target.value)} // Update state with the email input
                                            placeholder={t('ENTER_EMAIL')} // Placeholder from translations
                                            required // Make sure the input is required
                                        />
                                    </Form.Group>
                                    {responseMessage && <p>{responseMessage}</p>}
                                </Col>
                                <Col>
                                    <Button variant={'outline-warning'} type="submit">{t('SUBSCRIBE')}</Button>
                                </Col>

                                <div className={'mt-2 '} style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_1')}</div>
                                <div style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_2')}</div>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Gallery;