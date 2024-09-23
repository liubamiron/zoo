import {useState} from "react";
import {createReviewData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";


function ReviewCreate() {
    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    const [rating, setRating] = useState();

    const handleReviewCreate = async (event) => {
        event.preventDefault();

        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating)) {
            console.error('Invalid rating value');
            return; // Stop if rating is invalid
        }

        // Construct the event object using the state values
        const reviewData = {
            title_ru: titleRU,
            title_ro: titleRO,
            title_en: titleEN,
            short_description_ru: shortDescriptionRU,
            short_description_ro: shortDescriptionRO,
            short_description_en: shortDescriptionEN,
            long_description_ru: longDescriptionRU,
            long_description_ro: longDescriptionRO,
            long_description_en: longDescriptionEN,
            rating: parsedRating
        };

        try {
            const response = await createReviewData(reviewData);
            if (response) {
                console.log('Review created successfully:', response);
                // Optionally clear form fields or show a success message
            }
        } catch (error) {
            console.error('Error while creating Review:', error);
        }
    };


    return (
        <div>
            <h4>Review Create</h4>
            <Form onSubmit={handleReviewCreate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Label>Name RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={titleRO}
                            onChange={(event) => setTitleRO(event.target.value)}
                            placeholder="Enter title ro"
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="title ru">
                            <Form.Label>Name RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleRU}
                                onChange={(event) => setTitleRU(event.target.value)}
                                placeholder="Enter title RU"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title EN">
                            <Form.Label>Name EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={titleEN}
                                onChange={(event) => setTitleEN(event.target.value)}
                                placeholder="Enter title EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="short_description_ro">
                            <Form.Label>short Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionRO}
                                onChange={(event) => setShortDescriptionRO(event.target.value)}
                                placeholder="short description ro"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>short Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionRU}
                                onChange={(event) => setShortDescriptionRU(event.target.value)}
                                placeholder="short description ru"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>short Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={shortDescriptionEN}
                                onChange={(event) => setShortDescriptionEN(event.target.value)}
                                placeholder="short description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="long_description_ro">
                            <Form.Label>Long Description RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
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
                                rows={5}
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
                                rows={5}
                                value={longDescriptionEN}
                                onChange={(event) => setLongDescriptionEN(event.target.value)}
                                placeholder="Enter long description en"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="rating">
                            <Form.Label>Review Rating</Form.Label>
                            <Form.Control
                                type="text"
                                value={rating}
                                onChange={(event) => setRating(event.target.value)}
                                placeholder="Enter rating"
                            />
                        </Form.Group>
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

export default ReviewCreate;