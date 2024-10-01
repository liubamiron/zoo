import {useEffect, useState} from 'react';
import {createAnimalData, fetchTypeAnimals} from "../../utils/apiCalls";
import {Col, Form, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";

function AdminAnimalsCreate() {

    const [types, setTypes] = useState([]);
    const [createAnimal, setCreateAnimal] = useState({
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
        protection_ro: '',
        protection_ru: '',
        protection_en: '',
        conservation_ro: '',
        conservation_ru: '',
        conservation_en: '',
        img_1: '',
        img_2: '',
        img_3: '',
        img_4: '',
    });


    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');

    useEffect(() => {
        const getTypeAnimals = async () => {
            try {
                const data = await fetchTypeAnimals();
                setTypes(data);
            } catch (error) {
                console.error('Error fetching type animals:', error);
            }
        };
        getTypeAnimals();
    }, []);


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

    const handleNewAnimalChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            setCreateAnimal({ ...createAnimal, [name]: selectedOptions });
        } else {
            // Handle boolean conversion for the new_animal and disappearing fields
            const newValue = value === 'true' ? true : value === 'false' ? false : value;
            setCreateAnimal({ ...createAnimal, [name]: newValue });
        }
    };


    const handleCreate = (e) => {
        e.preventDefault();
        // Create a FormData object to handle text and file data
        const formData = new FormData();
        formData.append('name_ro', createAnimal.name_ro);
        formData.append('name_ru', createAnimal.name_ru);
        formData.append('name_en', createAnimal.name_en);
        formData.append('descr_short_ro', createAnimal.descr_short_ro);
        formData.append('descr_short_ru', createAnimal.descr_short_ru);
        formData.append('descr_short_en', createAnimal.descr_short_en);
        formData.append('descr_long_ru', createAnimal.descr_long_ru);
        formData.append('descr_long_ro', createAnimal.descr_long_ro);
        formData.append('descr_long_en', createAnimal.descr_long_en);
        formData.append('habitat_ru', createAnimal.habitat_ru);
        formData.append('habitat_ro', createAnimal.habitat_ro);
        formData.append('habitat_en', createAnimal.habitat_en);
        formData.append('family_ru', createAnimal.family_ru);
        formData.append('family_ro', createAnimal.family_ro);
        formData.append('family_en', createAnimal.family_en);
        formData.append('genus_ru', createAnimal.genus_ru);
        formData.append('genus_ro', createAnimal.genus_ro);
        formData.append('genus_en', createAnimal.genus_en);
        formData.append('phylum_ru', createAnimal.phylum_ru);
        formData.append('phylum_ro', createAnimal.phylum_ro);
        formData.append('phylum_en', createAnimal.phylum_en);
        formData.append('clas_ru', createAnimal.clas_ru);
        formData.append('clas_ro', createAnimal.clas_ro);
        formData.append('clas_en', createAnimal.clas_en);
        formData.append('domain_ru', createAnimal.domain_ru);
        formData.append('domain_ro', createAnimal.domain_ro);
        formData.append('domain_en', createAnimal.domain_en);
        formData.append('karyotype_ru', createAnimal.karyotype_ru);
        formData.append('karyotype_ro', createAnimal.karyotype_ro);
        formData.append('karyotype_en', createAnimal.karyotype_en);
        formData.append('habitat_long_ru', createAnimal.habitat_long_ru);
        formData.append('habitat_long_ro', createAnimal.habitat_long_ro);
        formData.append('habitat_long_en', createAnimal.habitat_long_en);
        formData.append('general_info_ru', createAnimal.general_info_ru);
        formData.append('general_info_ro', createAnimal.general_info_ro);
        formData.append('general_info_en', createAnimal.general_info_en);
        formData.append('nutrition_ru', createAnimal.nutrition_ru);
        formData.append('nutrition_ro', createAnimal.nutrition_ro);
        formData.append('nutrition_en', createAnimal.nutrition_en);
        formData.append('facts_ru', createAnimal.facts_ru);
        formData.append('facts_ro', createAnimal.facts_ro);
        formData.append('facts_en', createAnimal.facts_en);
        formData.append('types', JSON.stringify(createAnimal.types)); // Handle array properly
        formData.append('conservation_ro', createAnimal.conservation_ro);
        formData.append('conservation_ru', createAnimal.conservation_ru);
        formData.append('conservation_en', createAnimal.conservation_en);
        formData.append('protection_ro', createAnimal.protection_ro);
        formData.append('protection_ru', createAnimal.protection_ru);
        formData.append('protection_en', createAnimal.protection_en);
        formData.append('new_animal', createAnimal.new_animal);
        formData.append('disappearing', createAnimal.disappearing);
        formData.append('img_1', img1);
        formData.append('img_2', img2);
        formData.append('img_3', img3);
        formData.append('img_4', img4);

        createAnimalData(formData).then(r => console.log('r', r))
    };

    return (
        <div>
            <h4>Create new</h4>
            <Form onSubmit={handleCreate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="name_ro">
                            <Form.Label>NameRO</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ro"
                                placeholder="Enter NameRO"
                                value={createAnimal.name_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.name_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.name_en}
                                onChange={handleNewAnimalChange}

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
                                value={createAnimal.descr_short_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.descr_short_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.descr_short_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.descr_long_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.descr_long_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.descr_long_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.habitat_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.habitat_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.habitat_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.habitat_long_ro}
                                onChange={handleNewAnimalChange}

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
                                value={createAnimal.habitat_long_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.habitat_long_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.family_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.family_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.family_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.genus_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.genus_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.genus_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.phylum_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.phylum_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.phylum_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.clas_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.clas_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.clas_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.domain_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.domain_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.domain_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.karyotype_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.karyotype_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.karyotype_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.general_info_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.general_info_ru}
                                onChange={handleNewAnimalChange}
                                placeholder="Общение (RU)"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="general_info_en" className="mb-4">
                            <Form.Label>general info (EN)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="general_info_en"
                                value={createAnimal.general_info_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.nutrition_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.nutrition_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.nutrition_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.facts_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.facts_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.facts_en}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.new_animal}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.disappearing}
                                onChange={handleNewAnimalChange}
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
                        <Form.Group controlId="typeAnimals" className="mb-4">
                            <Form.Label>Select types</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="types"
                                value={createAnimal.types}
                                onChange={handleNewAnimalChange}
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
                <br/>
                <Row>
                    <Col>
                        <Form.Group controlId="conservation_ro" className="mb-4">
                            <Form.Label>Conservarea statut</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="conservation_ro"
                                placeholder="Conservarea statut"
                                value={createAnimal.conservation_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.conservation_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.conservation_en}
                                placeholder="Conservation"
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.protection_ro}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.protection_ru}
                                onChange={handleNewAnimalChange}
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
                                value={createAnimal.protection_en}
                                placeholder="Communication EN"
                                onChange={handleNewAnimalChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;1</span>&nbsp;
                            <Form.Control
                                type="file"
                                onChange={handleImg1Change}/>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex align-items-center">
                            <span>Img&nbsp;2</span>
                            <Form.Control
                                type="file"
                                onChange={handleImg2Change}/>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className={'mt-4'}>
                    <Col xs={12} md={6}>
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

export default AdminAnimalsCreate;