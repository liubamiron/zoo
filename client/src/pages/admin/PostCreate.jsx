
import {useState} from "react";
import {createPostData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";

function PostCreate() {
    const [nameRU, setNameRU]=useState('')
    const [nameRO, setNameRO]=useState('')
    const [nameEN, setNameEN]=useState('')

    const [titleRU, setTitleRU]=useState('')
    const [titleRO, setTitleRO]=useState('')
    const [titleEN, setTitleEN]=useState('')

    const [shortDescriptionRU, setShortDescriptionRU] = useState('');
    const [shortDescriptionRO, setShortDescriptionRO] = useState('');
    const [shortDescriptionEN, setShortDescriptionEN] = useState('');

    const [longDescriptionRU, setLongDescriptionRU] = useState('');
    const [longDescriptionRO, setLongDescriptionRO] = useState('');
    const [longDescriptionEN, setLongDescriptionEN] = useState('');

    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);

    const [post_tags, setPost_tags] = useState([])

    const addPost_tags = () => {
        setPost_tags([...post_tags, {name_ru: '', name_ro: '', name_en: '', number: Date.now()}])
    }

    const changePost_tags = (key, value, number) => {
        setPost_tags(post_tags.map(i => i.number === number ? {...i, [key]: value} : i))
    }


    const handlePostCreate  = (event) => {
        event.preventDefault();

        const formData = new FormData();
        // Append text fields to formData
        formData.append('name_ru', nameRU);
        formData.append('name_ro', nameRO);
        formData.append('name_en', nameEN);
        formData.append('title_ru', titleRU);
        formData.append('title_ro', titleRO);
        formData.append('title_en', titleEN);
        formData.append('short_description_ru', shortDescriptionRU);
        formData.append('short_description_ro', shortDescriptionRO);
        formData.append('short_description_en', shortDescriptionEN);
        formData.append('long_description_ru', longDescriptionRU);
        formData.append('long_description_ro', longDescriptionRO);
        formData.append('long_description_en', longDescriptionEN);
        formData.append('img_1', img1);
        formData.append('img_2', img2);
        formData.append('post_tags', JSON.stringify(post_tags));

        createPostData(formData)
            .then((response) => {
                console.log('Success:', response);
                // Handle success, e.g., showing a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, e.g., showing an error message
            });
    };

    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
        console.log(img1, 'img1')
    };

    // Handler for the second image input
    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };

    return (
        <>
        <h4>Create New Blog Post</h4>
            <br/>
            <Form onSubmit={handlePostCreate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="name_ro">
                        <Form.Label>Name RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameRO}
                            onChange={(event) => setNameRO(event.target.value)}
                            placeholder="Enter name ro"
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_ru">
                            <Form.Label>Name RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={nameRU}
                                onChange={(event) => setNameRU(event.target.value)}
                                placeholder="Enter name RU"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_en">
                            <Form.Label>Name EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={nameEN}
                                onChange={(event) => setNameEN(event.target.value)}
                                placeholder="Enter name EN"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Label>Title RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={titleRO}
                            onChange={(event) => setTitleRO(event.target.value)}
                            placeholder="Enter title ro"
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="title ru">
                            <Form.Label>Title RU</Form.Label>
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
                            <Form.Label>Title EN</Form.Label>
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
                                type="text"
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
                                type="text"
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
                                type="text"
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
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="img1">
                            <Form.Label>Image 1 URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImg1Change}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="img2">
                            <Form.Label>Image 2 URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImg2Change}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Button onClick={addPost_tags} variant={"outline-info"}>Add tags</Button>
                {post_tags.map(i =>
                    <Row className={'mt-4'} key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                value={i.name_ro}
                                placeholder="tag ro"
                                onChange={(e) => changePost_tags('name_ro', e.target.value, i.number)}
                                />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.name_ru}
                                placeholder="tag_ru"
                                onChange={(e) => changePost_tags('name_ru', e.target.value, i.number)}

                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.name_en}
                                placeholder="tag_en"
                                onChange={(e) => changePost_tags('name_en', e.target.value, i.number)}

                            />
                        </Col>
                    </Row>
                )}
                <br />
               <br/>
                <Button type="submit" variant="primary">
                    Submit Post
                </Button>

            </Form>
        </>
    );
}

export default PostCreate;