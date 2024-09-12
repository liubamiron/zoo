import React, {useEffect, useState} from 'react';
import {createAnimalData, fetchTypeAnimals, updateAnimalData} from "../../utils/apiCalls";
import {Col, Form, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";

function AdminAnimalsCreate() {

            // const [animalData, setAnimalData] = useState(null);

            const [nameRO, setNameRO] = useState('');
            const [nameRU, setNameRU] = useState('');
            const [nameEN, setNameEN] = useState('');

            const [descrShortRO, setDescrShortRO] = useState('');
            const [descrShortRU, setDescrShortRU] = useState('');
            const [descrShortEN, setDescrShortEN] = useState('');

            const [descrLongRO, setDescrLongRO] = useState('')
            const [descrLongRU, setDescrLongRU] = useState('')
            const [descrLongEN, setDescrLongEN] = useState('')

            const [habitatRO, setHabitatRO] = useState('');
            const [habitatRU, setHabitatRU] = useState('');
            const [habitatEN, setHabitatEN] = useState('');

            const [familyRO, setFamilyRO] = useState('');
            const [familyRU, setFamilyRU] = useState('');
            const [familyEN, setFamilyEN] = useState('');

            const [genusRO, setGenusRO] = useState('');
            const [genusRU, setGenusRU] = useState('');
            const [genusEN, setGenusEN] = useState('');

            const [phylumRO, setPhylumRO] = useState('');
            const [phylumRU, setPhylumRU] = useState('');
            const [phylumEN, setPhylumEN] = useState('');

            const [classRO, setClassRO] = useState('');
            const [classRU, setClassRU] = useState('');
            const [classEN, setClassEN] = useState('');

            const [domainRO, setDomainRO] = useState('');
            const [domainRU, setDomainRU] = useState('');
            const [domainEN, setDomainEN] = useState('');

            const [karyotypeRO, setKaryotypeRO] = useState('');
            const [karyotypeRU, setKaryotypeRU] = useState('');
            const [karyotypeEN, setKaryotypeEN] = useState('');

            const [habitatLongRO, setHabitatLongRO] = useState('');
            const [habitatLongRU, setHabitatLongRU] = useState('');
            const [habitatLongEN, setHabitatLongEN] = useState('');

            const [generalInfoRO, setGeneralInfoRO] = useState('');
            const [generalInfoRU, setGeneralInfoRU] = useState('');
            const [generalInfoEN, setGeneralInfoEN] = useState('');

            const [nutritionRO, setNutritionRO] = useState('');
            const [nutritionRU, setNutritionRU] = useState('');
            const [nutritionEN, setNutritionEN] = useState('');

            const [factsRO, setFactsRO] = useState('');
            const [factsRU, setFactsRU] = useState('');
            const [factsEN, setFactsEN] = useState('');

            const [protectionRO, setProtectionRO] = useState(false);
            const [protectionRU, setProtectionRU] = useState(false);
            const [protectionEN, setProtectionEN] = useState(false);

            const [img1, setImg1] = useState('');
            const [img2, setImg2] = useState('');

            const [typeAnimal, setTypeAnimal] = useState(4);


            const [typeAnimals, setTypeAnimals] = useState([]);
            const [error, setError] = useState(null);

            useEffect(() => {
            const getTypeAnimals = async () => {
            try {
            const data = await fetchTypeAnimals();
            setTypeAnimals(data);
        } catch (error) {
            console.error('Error fetching type animals:', error);
        }
        };

            getTypeAnimals();
        }, []);

            // Handler for the first image input
            const handleImg1Change = (e) => {
            setImg1(e.target.files[0]);
        };

            // Handler for the second image input
            const handleImg2Change = (e) => {
            setImg2(e.target.files[0]);
        };

            const selectFile =(e) => {
            console.log(e.target.files[0])
            setImg1(e.target.files[0])

            // setFile(URL.createObjectURL(e.target.files[0]));
        }


            const handleCreate =  (event) => {
            event.preventDefault();

            // Create a FormData object to handle text and file data
            const formData = new FormData();

            // Append text fields
            formData.append('name_ro', nameRO);
            formData.append('name_ru', nameRU);
            formData.append('name_en', nameEN);
            formData.append('descr_short_ro', descrShortRO);
            formData.append('descr_short_ru', descrShortRU);
            formData.append('descr_short_en', descrShortEN);
            formData.append('descr_long_ru', descrLongRU);
            formData.append('descr_long_ro', descrLongRO);
            formData.append('descr_long_en', descrLongEN);
            formData.append('habitat_ru', habitatRU);
            formData.append('habitat_ro', habitatRO);
            formData.append('habitat_en', habitatEN);
            formData.append('family_ru', familyRU);
            formData.append('family_ro', familyRO);
            formData.append('family_en', familyEN);
            formData.append('genus_ru', genusRU);
            formData.append('genus_ro', genusRO);
            formData.append('genus_en', genusEN);
            formData.append('phylum_ru', phylumRU);
            formData.append('phylum_ro', phylumRO);
            formData.append('phylum_en', phylumEN);
            formData.append('clas_ru', classRU);
            formData.append('clas_ro', classRO);
            formData.append('clas_en', classEN);
            formData.append('domain_ru', domainRU);
            formData.append('domain_ro', domainRO);
            formData.append('domain_en', domainEN);
            formData.append('karyotype_ru', karyotypeRU);
            formData.append('karyotype_ro', karyotypeRO);
            formData.append('karyotype_en', karyotypeEN);
            formData.append('habitat_long_ru', habitatLongRU);
            formData.append('habitat_long_ro', habitatLongRO);
            formData.append('habitat_long_en', habitatLongEN);
            formData.append('general_info_ru', generalInfoRU);
            formData.append('general_info_ro', generalInfoRO);
            formData.append('general_info_en', generalInfoEN);
            formData.append('nutrition_ru', nutritionRU);
            formData.append('nutrition_ro', nutritionRO);
            formData.append('nutrition_en', nutritionEN);
            formData.append('facts_ru', factsRU);
            formData.append('facts_ro', factsRO);
            formData.append('facts_en', factsEN);
            formData.append('protection_ro', protectionRO);
            formData.append('protection_ru', protectionRU);
            formData.append('protection_en', protectionEN);
            formData.append('typeAnimalId', typeAnimal);
            formData.append('img_1', img1);
            formData.append('img_2', img2);
            createAnimalData(formData).then(r => console.log('r', r))
        };

    return (
            <div>
            <h2>Create new</h2>
            <Form onSubmit={handleCreate}>
            <Row className={'mt-4'}>
            <Col>
            <Form.Group controlId="nameRO">
            <Form.Label>NameRO</Form.Label>
            <Form.Control
            type="text"
            value={nameRO}
            onChange={(event) => setNameRO(event.target.value)}
            placeholder="Enter NameRO"
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="nameRU">
            <Form.Label>NameRU</Form.Label>
            <Form.Control
            type="text"
            value={nameRU}
            onChange={(event) => setNameRU(event.target.value)}
            placeholder="Enter NameRU"
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="nameEN">
            <Form.Label>NameEN</Form.Label>
            <Form.Control
            type="text"
            value={nameEN}
            onChange={(event) => setNameEN(event.target.value)}
            placeholder="Enter NameEN"
            />
            </Form.Group>
            </Col>
            </Row>
            <Row className={'mt-4'}>
            <Col >
            <Form.Group controlId="descrShortRO" className="mb-4">
            <Form.Label>Short Description (RO)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            value={descrShortRO}
            onChange={(event) => setDescrShortRO(event.target.value)}
            placeholder="Enter Short Description (RO)"
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="descrShortRU" className="mb-4">
            <Form.Label>Short Description (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            value={descrShortRU}
            onChange={(event) => setDescrShortRU(event.target.value)}
            placeholder="Enter Short Description (RU)"
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="descrShortEN" className="mb-4">
            <Form.Label>Short Description (EN) </Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            value={descrShortEN}
            onChange={(event) => setDescrShortEN(event.target.value)}
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
            value={descrLongRO}
            onChange={(event) => setDescrLongRO(event.target.value)}
            placeholder="Enter Description (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="descr_long_ro" className="mb-4">
            <Form.Label>Long Description (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="descr_long_ru"
            value={descrLongRU}
            onChange={(event) => setDescrLongRU(event.target.value)}
            placeholder="Enter Description (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="descr_long_ro" className="mb-4">
            <Form.Label>Long Description (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="descr_long_en"
            value={descrLongEN}
            onChange={(event) => setDescrLongEN(event.target.value)}
            placeholder="Enter Description (EN)"                        />
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col>
            <Form.Group controlId="descr_long_ro" className="mb-4">
            <Form.Label>Habitat (RO)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="habitat_ro"
            value={habitatRO}
            onChange={(event) => setHabitatRO(event.target.value)}
            placeholder="Enter Habitat (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="descr_long_ro" className="mb-4">
            <Form.Label>Habitat (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="habitat_ru"
            value={habitatRU}
            onChange={(event) => setDescrLongRU(event.target.value)}
            placeholder="Enter habitat (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="habitat_en" className="mb-4">
            <Form.Label>habitat (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="habitat_en"
            value={habitatEN}
            onChange={(event) => setHabitatEN(event.target.value)}
            placeholder="habitat description (EN)"                        />
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
            value={habitatLongRO}
            onChange={(event) => setHabitatLongRO(event.target.value)}
            placeholder="Enter Habitat Long (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="habitat_long_ru" className="mb-4">
            <Form.Label>Habitat Long (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="habitat_long_ru"
            value={habitatLongRU}
            onChange={(event) => setHabitatLongRU(event.target.value)}
            placeholder="Enter habitat (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="habitat_en" className="mb-4">
            <Form.Label>habitat Long (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="habitat_long_en"
            value={habitatLongEN}
            onChange={(event) => setHabitatLongEn(event.target.value)}
            placeholder="habitat description (EN)"                        />
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
            value={familyRO}
            onChange={(event) => setFamilyRO(event.target.value)}
            placeholder="Family (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="family_ru" className="mb-4">
            <Form.Label>Family (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="family_ru"
            value={familyRU}
            onChange={(event) => setFamilyRU(event.target.value)}
            placeholder="Family (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="family_en" className="mb-4">
            <Form.Label>Family (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="family_en"
            value={familyEN}
            onChange={(event) => setFamilyEN(event.target.value)}
            placeholder="family (EN)"                        />
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
            value={genusRO}
            onChange={(event) => setGenusRO(event.target.value)}
            placeholder="Genus (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="genus_ru" className="mb-4">
            <Form.Label>Genus (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="genus_ru"
            value={genusRU}
            onChange={(event) => setGenusRU(event.target.value)}
            placeholder="Genus (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="genus_en" className="mb-4">
            <Form.Label>Genus (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="genus_en"
            value={genusEN}
            onChange={(event) => setGenusEN(event.target.value)}
            placeholder="Genus (EN)"                        />
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
            value={phylumRO}
            onChange={(event) => setPhylumRO(event.target.value)}
            placeholder="phylum (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="phylum_ru" className="mb-4">
            <Form.Label>phylum (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="phylum_ru"
            value={phylumRU}
            onChange={(event) => setPhylumRU(event.target.value)}
            placeholder="phylum (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="phylum_en" className="mb-4">
            <Form.Label>phylum (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="phylum_en"
            value={phylumEN}
            onChange={(event) => setPhylumEN(event.target.value)}
            placeholder="phylum (EN)"                        />
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
            value={classRO}
            onChange={(event) => setClassRO(event.target.value)}
            placeholder="class (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="clas_ru" className="mb-4">
            <Form.Label>Class (RO)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="clas_ru"
            value={classRU}
            onChange={(event) => setClassRU(event.target.value)}
            placeholder="class (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="clas_en" className="mb-4">
            <Form.Label>Class (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="clas_en"
            value={classEN}
            onChange={(event) => setClassEN(event.target.value)}
            placeholder="class (EN)"                        />
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
            value={domainRO}
            onChange={(event) => setDomainRO(event.target.value)}
            placeholder="domain (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="domain_ru" className="mb-4">
            <Form.Label>Domain (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="domain_ru"
            value={domainRU}
            onChange={(event) => setDomainRU(event.target.value)}
            placeholder="domain (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="domain_en" className="mb-4">
            <Form.Label>Domain (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="domain_en"
            value={domainEN}
            onChange={(event) => setDomainEN(event.target.value)}
            placeholder="domain (EN)"                        />
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
            value={karyotypeRO}
            onChange={(event) => setKaryotypeRO(event.target.value)}
            placeholder="karyotype (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="karyotype_ru" className="mb-4">
            <Form.Label>Karyotype (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="karyotype_ru"
            value={karyotypeRU}
            onChange={(event) => setKaryotypeRU(event.target.value)}
            placeholder="karyotype (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="karyotype_en" className="mb-4">
            <Form.Label>Karyotype (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="karyotype_en"
            value={karyotypeEN}
            onChange={(event) => setKaryotypeEN(event.target.value)}
            placeholder="karyotype (EN)"                        />
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
            value={generalInfoRO}
            onChange={(event) => setGeneralInfoRO(event.target.value)}
            placeholder="general info (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="general_info_ru" className="mb-4">
            <Form.Label>general info (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="general_info_ru"
            value={generalInfoRU}
            onChange={(event) => setGeneralInfoRU(event.target.value)}
            placeholder="general info (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="general_info_en" className="mb-4">
            <Form.Label>general info (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="general_info_en"
            value={generalInfoEN}
            onChange={(event) => setGeneralInfoEN(event.target.value)}
            placeholder="general info (EN)"                        />
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
            value={nutritionRO}
            onChange={(event) => setNutritionRO(event.target.value)}
            placeholder="Nutrition (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="nutrition_ru" className="mb-4">
            <Form.Label>nutrition (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="nutrition_ru"
            value={nutritionRU}
            onChange={(event) => setNutritionRU(event.target.value)}
            placeholder="Nutrition (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="nutrition_en" className="mb-4">
            <Form.Label>nutrition (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="nutrition_en"
            value={nutritionEN}
            onChange={(event) => setNutritionEN(event.target.value)}
            placeholder="Nutrition (EN)"                        />
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
            value={factsRO}
            onChange={(event) => setFactsRO(event.target.value)}
            placeholder="facts (RO)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="facts_ru" className="mb-4">
            <Form.Label>facts (RU)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="facts_ru"
            value={factsRU}
            onChange={(event) => setFactsRU(event.target.value)}
            placeholder="facts (RU)"                        />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="facts_ro" className="mb-4">
            <Form.Label>facts (EN)</Form.Label>
            <Form.Control
            as="textarea"
            rows={4}
            name="facts_en"
            value={factsEN}
            onChange={(event) => setFactsEN(event.target.value)}
            placeholder="facts (EN)"                        />
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col>
            <Form.Group controlId="type_ro" className="mb-4">
            <Form.Label>select type (RO)</Form.Label>
            <Form.Control
            as="select"
            name="typeAnimal"
            value={typeAnimal}
            onChange={(event) => setTypeAnimal(event.target.value)}
            >
        {typeAnimals.map((type) => (
            <option key={type.id} value={type.id}>
        {type.name_ro}
            </option>
            ))}
            </Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="type_ru" className="mb-4">
            <Form.Label>select type (RU)</Form.Label>
            <Form.Control
            as="select"
            name="typeAnimal"
            value={typeAnimal}
            onChange={(event) => setTypeAnimal(event.target.value)}
            >
        {typeAnimals.map((type) => (
            <option key={type.id} value={type.id}>
        {type.name_ru}
            </option>
            ))}
            </Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="type_en" className="mb-4">
            <Form.Label>select type (EN)</Form.Label>
            <Form.Control
            as="select"
            name="typeAnimal"
            value={typeAnimal}
            onChange={(event) => setTypeAnimal(event.target.value)}
            >
        {typeAnimals.map((type) => (
            <option key={type.id} value={type.id}>
        {type.name_en}
            </option>
            ))}
            </Form.Control>
            </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col>
            <Form.Group controlId="protection_ro" className="mb-4">
            <Form.Label>Protection</Form.Label>
            <Form.Control
            as="select"
            name="protection"
            value={protectionRO}
            placeholder="protection RO"
            onChange={(event) => setProtectionRO(event.target.value)}
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="protection_ru" className="mb-4">
            <Form.Label>Protection RU</Form.Label>
            <Form.Control
            as="select"
            name="protection_ru"
            value={protectionRU}
            placeholder="protection RU"
            onChange={(event) => setProtectionRU(event.target.value)}
            />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="protection_en" className="mb-4">
            <Form.Label>Protection EN</Form.Label>
            <Form.Control
            as="select"
            name="protection"
            value={protectionEN}
            placeholder="protection EN"
            onChange={(event) => setProtectionEN(event.target.value)}
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
            <br />
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>

        </div>
    );
}

export default AdminAnimalsCreate;