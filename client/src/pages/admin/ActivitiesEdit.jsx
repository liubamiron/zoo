import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchActivitiesById, updateActivitiesData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";


const ActivitiesEdit = () => {
    const { id } = useParams();
    const [titleRU, setTitleRU] = useState('');
    const [titleRO, setTitleRO] = useState('');
    const [titleEN, setTitleEN] = useState('');

    // Short description states
    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    // Long description states
    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    // File input states
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    useEffect(() => {
        const getActivities = async () => {
            try {
                const data = await fetchActivitiesById(id);
                console.log(data, 'data');
                setTitleRU(data?.title_ru);
                setTitleRO(data?.title_ro);
                setTitleEN(data?.title_en);
                setShortDescriptionRU(data?.short_description_ru);
                setShortDescriptionRO(data?.short_description_ro);
                setShortDescriptionEN(data?.short_description_en);
                setLongDescriptionRU(data?.long_description_ru);
                setLongDescriptionRO(data?.long_description_ro);
                setLongDescriptionEN(data?.long_description_en);
                setFile1(data?.img_1);
                setFile2(data?.img_2);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        getActivities();
    }, [id]);

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
        console.log(file1, 'img1');
    };

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
        console.log(file2, 'img2');

    };

    const handleActivitiesSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        // Append text fields to formData
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_en', shortDescriptionEN);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_en', longDescriptionEN);

        // Append files to formData if available
        if (file1) {
            formData.append('img_1', file1);
        }
        if (file2) {
            formData.append('img_2', file2);
        }

        updateActivitiesData(formData, id)
            .then((response) => {
                console.log('Success:', response);
                // Handle success, e.g., showing a success message or redirecting
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, e.g., showing an error message
            });
    };

    console.log(file1, file2, 'img1');

    return (
        <div>
            Edit activity : <strong>{titleRO}</strong>

            <Form onSubmit={handleActivitiesSubmit}>
                <Row className="mt-4">
                    {/* Title fields */}
                    <Col>
                        <Form.Group controlId="title_ro">
                            <Form.Label>Title RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRO}
                                onChange={(event) => setTitleRO(event.target.value)}
                                placeholder="Enter title ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_ru">
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRU}
                                onChange={(event) => setTitleRU(event.target.value)}
                                placeholder="Enter title ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_en">
                            <Form.Label>Title EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleEN}
                                onChange={(event) => setTitleEN(event.target.value)}
                                placeholder="Enter title en"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Short description fields */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="short_description_ro">
                            <Form.Label>Short Description RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRO}
                                onChange={(event) => setShortDescriptionRO(event.target.value)}
                                placeholder="Short description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>Short Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionRU}
                                onChange={(event) => setShortDescriptionRU(event.target.value)}
                                placeholder="Short description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>Short Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={shortDescriptionEN}
                                onChange={(event) => setShortDescriptionEN(event.target.value)}
                                placeholder="Short description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Long description fields */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="long_description_ro">
                            <Form.Label>Long Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRO}
                                onChange={(event) => setLongDescriptionRO(event.target.value)}
                                placeholder="Enter long description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_ru">
                            <Form.Label>Long Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionRU}
                                onChange={(event) => setLongDescriptionRU(event.target.value)}
                                placeholder="Enter long description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_en">
                            <Form.Label>Long Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={longDescriptionEN}
                                onChange={(event) => setLongDescriptionEN(event.target.value)}
                                placeholder="Enter long description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* File input fields */}
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="fileName1">
                            <Form.Label>Image 1</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFile1Change}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="fileName2">
                            <Form.Label>Image 2</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFile2Change}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Image previews */}
                <Row className="mt-4">
                    <Col>
                        {file1 && <img src={`${import.meta.env.VITE_URL}/${file1}`} alt="img1" className="img-fluid" />}
                    </Col>
                    <Col>
                        {file2 && <img src={`${import.meta.env.VITE_URL}/${file2}`} alt="img2" className="img-fluid" />}
                    </Col>
                </Row>

                <br />
                <Button type="submit" variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default ActivitiesEdit;
