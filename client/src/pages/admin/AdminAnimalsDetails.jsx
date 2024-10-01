import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { fetchAnimalDataById, fetchTypeAnimals, updateAnimalData } from "../../utils/apiCalls";
import { Col, Form, Row, Button } from "react-bootstrap";

function AdminAnimalsDetails() {
    const { id } = useParams(); // Get the animal ID from the URL
    const [types, setTypes] = useState([]);
    const [animal, setAnimal] = useState({
        name_ro: '',
        name_ru: '',
        name_en: '',
        descr_short_ru: '',
        descr_short_ro: '',
        descr_short_en: '',
        descr_long_ru: '',
        descr_long_ro: '',
        descr_long_en: '',
        habitat_ru: '',
        habitat_ro: '',
        habitat_en: '',
        general_info_ru: '',
        general_info_ro: '',
        general_info_en: '',
        nutrition_ru: '',
        nutrition_ro: '',
        nutrition_en: '',
        facts_ru: '',
        facts_ro: '',
        facts_en: '',
        family_ru: '',
        family_ro: '',
        family_en: '',
        genus_ru: '',
        genus_ro: '',
        genus_en: '',
        phylum_ru: '',
        phylum_ro: '',
        phylum_en: '',
        clas_ru: '',
        clas_ro: '',
        clas_en: '',
        domain_ru: '',
        domain_ro: '',
        domain_en: '',
        karyotype_ru: '',
        karyotype_ro: '',
        karyotype_en: '',
        habitat_long_ru: '',
        habitat_long_ro: '',
        habitat_long_en: '',
        new_animal: 'false',
        disappearing: 'false',
        types: [],
        conservation_ro: '',
        conservation_ru: '',
        conservation_en: '',
        protection_ro: '',
        protection_ru: '',
        protection_en: '',
        img_1: '',
        img_2: '',
        img_3: '',
        img_4: '',
    });

    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');


    const getAnimal = async () => {
        try {
            const data = await fetchAnimalDataById(id);
            setAnimal(data);

            // Safely handle types, default to empty array if undefined
            setAnimal((prev) => ({
                ...prev,
                types: data.types ? data.types.map((type) => type.id) : [],
            }));
        } catch (err) {
            console.error('Error fetching animal data:', err);
        }
    };

    const getTypes = async () => {
        try {
            const data = await fetchTypeAnimals();
            setTypes(data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    useEffect(() => {
        getAnimal(); // Fetch animal data on mount
        getTypes();  // Fetch types on mount
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimal({ ...animal, [name]: value });
    };

    const handleTypeChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setAnimal({ ...animal, types: selectedOptions });
    };

    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
    };

    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };

    const handleImg3Change = (e) => {
        setImg3(e.target.files[0]);
    };

    const handleImg4Change = (e) => {
        setImg4(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name_ro', animal.name_ro);
        formData.append('name_ru', animal.name_ru);
        formData.append('name_en', animal.name_en);
        formData.append('descr_short_ro', animal.descr_short_ro);
        formData.append('descr_short_ru', animal.descr_short_ru);
        formData.append('descr_short_en', animal.descr_short_en);
        formData.append('descr_long_ru', animal.descr_long_ru);
        formData.append('descr_long_ro', animal.descr_long_ro);
        formData.append('descr_long_en', animal.descr_long_en);
        formData.append('habitat_ru', animal.habitat_ru);
        formData.append('habitat_ro', animal.habitat_ro);
        formData.append('habitat_en', animal.habitat_en);
        formData.append('family_ru', animal.family_ru);
        formData.append('family_ro', animal.family_ro);
        formData.append('family_en', animal.family_en);
        formData.append('genus_ru', animal.genus_ru);
        formData.append('genus_ro', animal.genus_ro);
        formData.append('genus_en', animal.genus_en);
        formData.append('phylum_ru', animal.phylum_ru);
        formData.append('phylum_ro', animal.phylum_ro);
        formData.append('phylum_en', animal.phylum_en);
        formData.append('clas_ru', animal.clas_ru);
        formData.append('clas_ro', animal.clas_ro);
        formData.append('clas_en', animal.clas_en);
        formData.append('domain_ru', animal.domain_ru);
        formData.append('domain_ro', animal.domain_ro);
        formData.append('domain_en', animal.domain_en);
        formData.append('karyotype_ru', animal.karyotype_ru);
        formData.append('karyotype_ro', animal.karyotype_ro);
        formData.append('karyotype_en', animal.karyotype_en);
        formData.append('habitat_long_ru', animal.habitat_long_ru);
        formData.append('habitat_long_ro', animal.habitat_long_ro);
        formData.append('habitat_long_en', animal.habitat_long_en);
        formData.append('general_info_ru', animal.general_info_ru);
        formData.append('general_info_ro', animal.general_info_ro);
        formData.append('general_info_en', animal.general_info_en);
        formData.append('nutrition_ru', animal.nutrition_ru);
        formData.append('nutrition_ro', animal.nutrition_ro);
        formData.append('nutrition_en', animal.nutrition_en);
        formData.append('facts_ru', animal.facts_ru);
        formData.append('facts_ro', animal.facts_ro);
        formData.append('facts_en', animal.facts_en);
        formData.append('types', JSON.stringify(animal.types)); // Handle array properly
        formData.append('conservation_ro', animal.conservation_ro);
        formData.append('conservation_ru', animal.conservation_ru);
        formData.append('conservation_en', animal.conservation_en);
        formData.append('protection_ro', animal.protection_ro);
        formData.append('protection_ru', animal.protection_ru);
        formData.append('protection_en', animal.protection_en);
        formData.append('new_animal', animal.new_animal);
        formData.append('disappearing', animal.disappearing);
        formData.append('img_1', img1);
        formData.append('img_2', img2);
        formData.append('img_3', img3);
        formData.append('img_4', img4);

        try {
            await updateAnimalData(id, formData)
        } catch (err) {
            console.error('Error updating animal:', err);
        }
    };

    console.log(types)

    return (
        <div>
            {/*<h4>{animal?.name_ro}</h4>*/}
            <Form onSubmit={handleSubmit}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="name_ro">
                            <Form.Label>NameRO</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ro"
                                placeholder="Enter NameRO"
                                value={animal.name_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_ru">
                            <Form.Label>NameRU</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ru"
                                placeholder="Название животного"
                                value={animal?.name_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_en">
                            <Form.Label>NameEN</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_en"
                                placeholder="Enter NameEN"
                                value={animal?.name_en}
                                onChange={handleInputChange}

                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="descr_short_ro" className="mb-4">
                            <Form.Label>Short Description (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_short_ro"
                                value={animal?.descr_short_ro}
                                onChange={handleInputChange}
                                placeholder="Enter Short Description (RO)"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="descr_short_ru" className="mb-4">
                            <Form.Label>Short Description (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_short_ru"
                                value={animal?.descr_short_ru}
                                onChange={handleInputChange}
                                placeholder="Enter Short Description (RU)"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="descr_short_en" className="mb-4">
                            <Form.Label>Short Description (EN) </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_short_en"
                                value={animal?.descr_short_en}
                                onChange={handleInputChange}
                                placeholder="Enter Short Description (EN)"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="descr_long_ro" className="mb-4">
                            <Form.Label>Long Description (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_long_ro"
                                value={animal?.descr_long_ro}
                                onChange={handleInputChange}
                                placeholder="Enter Description (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="descr_long_ru" className="mb-4">
                            <Form.Label>Long Description (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_long_ru"
                                value={animal?.descr_long_ru}
                                onChange={handleInputChange}
                                placeholder="Enter Description (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="descr_long_en" className="mb-4">
                            <Form.Label>Long Description (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="descr_long_en"
                                value={animal?.descr_long_en}
                                onChange={handleInputChange}
                                placeholder="Enter Description (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="habitat_ro" className="mb-4">
                            <Form.Label>Habitat (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_ro"
                                value={animal?.habitat_ro}
                                onChange={handleInputChange}
                                placeholder="Enter Habitat (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="habitat_ru" className="mb-4">
                            <Form.Label>Habitat (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_ru"
                                value={animal?.habitat_ru}
                                onChange={handleInputChange}
                                placeholder="Обитание (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="habitat_en" className="mb-4">
                            <Form.Label>habitat (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_en"
                                value={animal?.habitat_en}
                                onChange={handleInputChange}
                                placeholder="habitat description (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="habitat_long_ro" className="mb-4">
                            <Form.Label>Habitat Long(RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_long_ro"
                                placeholder="Enter Habitat Long (RO)"
                                value={animal?.habitat_long_ro}
                                onChange={handleInputChange}

                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="habitat_long_ru" className="mb-4">
                            <Form.Label>Habitat Long (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_long_ru"
                                value={animal?.habitat_long_ru}
                                onChange={handleInputChange}
                                placeholder="Ареал обитания (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="habitat_long_en" className="mb-4">
                            <Form.Label>habitat Long (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="habitat_long_en"
                                value={animal?.habitat_long_en}
                                onChange={handleInputChange}
                                placeholder="habitat description (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="family_ro" className="mb-4">
                            <Form.Label>Family (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="family_ro"
                                value={animal?.family_ro}
                                onChange={handleInputChange}
                                placeholder="Family (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="family_ru" className="mb-4">
                            <Form.Label>Family (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="family_ru"
                                value={animal?.family_ru}
                                onChange={handleInputChange}
                                placeholder="Семейство (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="family_en" className="mb-4">
                            <Form.Label>Family (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="family_en"
                                value={animal?.family_en}
                                onChange={handleInputChange}
                                placeholder="family (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="genus_ro" className="mb-4">
                            <Form.Label>Genus (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="genus_ro"
                                value={animal?.genus_ro}
                                onChange={handleInputChange}
                                placeholder="Genus (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="genus_ru" className="mb-4">
                            <Form.Label>Genus (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="genus_ru"
                                value={animal?.genus_ru}
                                onChange={handleInputChange}
                                placeholder="Род (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="genus_en" className="mb-4">
                            <Form.Label>Genus (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="genus_en"
                                value={animal?.genus_en}
                                onChange={handleInputChange}
                                placeholder="Genus (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="phylum_ro" className="mb-4">
                            <Form.Label>phylum (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="phylum_ro"
                                value={animal?.phylum_ro}
                                onChange={handleInputChange}
                                placeholder="Încrengătură (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="phylum_ru" className="mb-4">
                            <Form.Label>phylum (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="phylum_ru"
                                value={animal?.phylum_ru}
                                onChange={handleInputChange}
                                placeholder="Тип (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="phylum_en" className="mb-4">
                            <Form.Label>phylum (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="phylum_en"
                                value={animal?.phylum_en}
                                onChange={handleInputChange}
                                placeholder="phylum (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="clas_ro" className="mb-4">
                            <Form.Label>Class (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="clas_ro"
                                value={animal?.clas_ro}
                                onChange={handleInputChange}
                                placeholder="class (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="clas_ru" className="mb-4">
                            <Form.Label>Class (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="clas_ru"
                                value={animal?.clas_ru}
                                onChange={handleInputChange}
                                placeholder="Класс (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="clas_en" className="mb-4">
                            <Form.Label>Class (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="clas_en"
                                value={animal?.clas_en}
                                onChange={handleInputChange}
                                placeholder="class (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="domain_ro" className="mb-4">
                            <Form.Label>Domain (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="domain_ro"
                                value={animal?.domain_ro}
                                onChange={handleInputChange}
                                placeholder="domain (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="domain_ru" className="mb-4">
                            <Form.Label>Domain (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="domain_ru"
                                value={animal?.domain_ru}
                                onChange={handleInputChange}
                                placeholder="домен (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="domain_en" className="mb-4">
                            <Form.Label>Domain (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="domain_en"
                                value={animal?.domain_en}
                                onChange={handleInputChange}
                                placeholder="domain (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="karyotype_ro" className="mb-4">
                            <Form.Label>Karyotype (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="karyotype_ro"
                                value={animal?.karyotype_ro}
                                onChange={handleInputChange}
                                placeholder="karyotype (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="karyotype_ru" className="mb-4">
                            <Form.Label>Karyotype (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="karyotype_ru"
                                value={animal?.karyotype_ru}
                                onChange={handleInputChange}
                                placeholder="кариотип (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="karyotype_en" className="mb-4">
                            <Form.Label>Karyotype (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="karyotype_en"
                                value={animal?.karyotype_en}
                                onChange={handleInputChange}
                                placeholder="karyotype (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="general_info_ro" className="mb-4">
                            <Form.Label>general info (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="general_info_ro"
                                value={animal?.general_info_ro}
                                onChange={handleInputChange}
                                placeholder="general info (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="general_info_ru" className="mb-4">
                            <Form.Label>general info (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="general_info_ru"
                                value={animal?.general_info_ru}
                                onChange={handleInputChange}
                                placeholder="Общая Информация (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="general_info_en" className="mb-4">
                            <Form.Label>general info (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="general_info_en"
                                value={animal?.general_info_en}
                                onChange={handleInputChange}
                                placeholder="general info (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="nutrition_ro" className="mb-4">
                            <Form.Label>nutrition (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="nutrition_ro"
                                value={animal?.nutrition_ro}
                                onChange={handleInputChange}
                                placeholder="Nutrition (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="nutrition_ru" className="mb-4">
                            <Form.Label>nutrition (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="nutrition_ru"
                                value={animal?.nutrition_ru}
                                onChange={handleInputChange}
                                placeholder="Питание (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="nutrition_en" className="mb-4">
                            <Form.Label>nutrition (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="nutrition_en"
                                value={animal?.nutrition_en}
                                onChange={handleInputChange}
                                placeholder="Nutrition (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="facts_ro" className="mb-4">
                            <Form.Label>facts (RO)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="facts_ro"
                                value={animal?.facts_ro}
                                onChange={handleInputChange}
                                placeholder="facts (RO)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="facts_ru" className="mb-4">
                            <Form.Label>facts (RU)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="facts_ru"
                                value={animal?.facts_ru}
                                onChange={handleInputChange}
                                placeholder="Интерессные факты (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="facts_en" className="mb-4">
                            <Form.Label>facts (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="facts_en"
                                value={animal?.facts_en}
                                onChange={handleInputChange}
                                placeholder="facts (EN)"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sx={12} md={4}>
                        <Form.Group controlId="new_animal" className="mb-4">
                            <Form.Label>New Animal</Form.Label>
                            <Form.Control
                                as="select"
                                name="new_animal"
                                value={animal?.new_animal}
                                onChange={handleInputChange}
                            >
                                <option value="">Select True or False</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col sx={12} md={4}>
                        <Form.Group controlId="disappearing" className="mb-4">
                            <Form.Label>Disappearing Animal</Form.Label>
                            <Form.Control
                                as="select"
                                name="disappearing"
                                value={animal?.disappearing}
                                onChange={handleInputChange}
                            >
                                <option value="">Select True or False</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="types" className="mb-4">
                            <Form.Label>Select types</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="types"
                                value={animal.types}
                                onChange={handleTypeChange}
                            >
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name_ro} / {type.name_ru} / {type.name_en}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="conservation_ro" className="mb-4">
                            <Form.Label>Conservarea statut</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="conservation_ro"
                                placeholder="Conservarea statut"
                                value={animal.conservation_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="conservation_ru" className="mb-4">
                            <Form.Label>Природохранный статус</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="conservation_ru"
                                placeholder="Природохранный статус"
                                value={animal.conservation_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="conservation_en" className="mb-4">
                            <Form.Label>Conservation</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="conservation_en"
                                value={animal.conservation_en}
                                placeholder="Conservation"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="protection_ro" className="mb-4">
                            <Form.Label> Comunicare/Reproducere</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="protection_ro"
                                placeholder="comunicare"
                                value={animal.protection_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="protection_ru" className="mb-4">
                            <Form.Label>Общение/размножение</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="protection_ru"
                                placeholder="Общение/размножение"
                                value={animal.protection_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="protection_en" className="mb-4">
                            <Form.Label>Communication</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="protection_en"
                                value={animal.protection_en}
                                placeholder="Communication EN"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            {animal?.img_1 && (
                                <img
                                    src={`${import.meta.env.VITE_URL}/${animal.img_1}`}
                                    alt="Animal Image 2"
                                    className="img-fluid"
                                />
                            )}
                        </div>
                        <br/>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;1</span>&nbsp;
                            <Form.Control
                                type="file"
                                onChange={handleImg1Change}/>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            {animal?.img_2 && (
                                <img
                                    src={`${import.meta.env.VITE_URL}/${animal.img_2}`}
                                    alt="Animal Image 2"
                                    className="img-fluid"
                                />
                            )}
                        </div>
                        <br/>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;2</span>
                            <Form.Control
                                type="file"
                                onChange={handleImg2Change}/>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className={'mt-4'}>÷
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;3</span>&nbsp;
                            <img
                                src={`${import.meta.env.VITE_URL}/${animal.img_3}`}
                                alt="Animal Image 3"
                                className="img-fluid"
                            />
                        </div>
                        <br/>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;3</span>&nbsp;
                            <Form.Control
                                type="file"
                                onChange={handleImg3Change}/>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;4</span>
                            <img
                                src={`${import.meta.env.VITE_URL}/${animal.img_4}`}
                                alt="Animal Image 4"
                                className="img-fluid"
                            />
                        </div>
                        <br/>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;4</span>
                            <Form.Control
                                type="file"
                                onChange={handleImg4Change}/>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AdminAnimalsDetails;
