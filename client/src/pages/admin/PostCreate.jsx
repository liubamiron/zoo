
import {useEffect, useState} from "react";
import {createPostData, getAllTags} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";

function PostCreate() {
    const [tags, setTags] = useState([]);
    const [createPost, setCreatePost] = useState({
        name_ro: '',
        name_ru: '',
        name_en: '',
        short_description_ru: '',
        short_description_ro: '',
        short_description_en: '',
        long_description_ru: '',
        long_description_ro: '',
        long_description_en: '',
        popular: 'false',
        types: [],
        img_1: '',
        img_2: '',
    });
    
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    
    useEffect(() => {
        const getTags = async () => {
            try {
                const data = await getAllTags();
                setTags(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        getTags();
    }, []);


    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
    };
    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };

    const handleNewPostChange = (e) => {
        const { name, value, tag } = e.target;

        if (tag === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            setCreatePost({ ...createPost, [name]: selectedOptions });
        } else {
            // Handle boolean conversion for the new_animal and disappearing fields
            const newValue = (name === 'popular' && (value === 'true' || value === 'false')) ? value === 'true' : value;

            setCreatePost({ ...createPost, [name]: newValue });
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        // Create a FormData object to handle text and file data
        const formData = new FormData();
        formData.append('name_ro', createPost.name_ro);
        formData.append('name_ru', createPost.name_ru);
        formData.append('name_en', createPost.name_en);
        formData.append('title_ro', createPost.title_ro);
        formData.append('title_ru', createPost.title_ru);
        formData.append('title_en', createPost.title_en);
        formData.append('short_description_ru', createPost.short_description_ru);
        formData.append('short_description_ro', createPost.short_description_ro);
        formData.append('short_description_en', createPost.short_description_en);
        formData.append('long_description_ru', createPost.long_description_ru);
        formData.append('long_description_ro', createPost.long_description_ro);
        formData.append('long_description_en', createPost.long_description_en);
        formData.append('popular', createPost.popular);

        formData.append('types', JSON.stringify(createPost.types)); // Handle array properly

        formData.append('img_1', img1);
        formData.append('img_2', img2);

        createPostData(formData).then(r => console.log('r', r))
    };

    return (
        <>
        <h4>Create New Blog Post</h4>
            <br/>
            <Form onSubmit={handleCreate}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="name_ro">
                            <Form.Label>NameRO</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ro"
                                placeholder="Enter NameRO"
                                value={createPost.name_ro}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_ru">
                            <Form.Label>Name RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ru"
                                placeholder="Enter NameRU"
                                value={createPost.name_ru}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_en">
                            <Form.Label>Name EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_en"
                                placeholder="Enter NameEN"
                                value={createPost.name_en}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Label>Title RO</Form.Label>
                        <Form.Control
                            type="text"
                            name="title_ro"
                            placeholder="Enter title"
                            value={createPost.title_ro}
                            onChange={handleNewPostChange}
                            required // This makes the field required
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId="title_ru">
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="title_ru"
                                placeholder="Enter title_ru"
                                value={createPost.title_ru}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_en">
                            <Form.Label>Title EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="title_en"
                                placeholder="Enter title_en"
                                value={createPost.title_en}
                                onChange={handleNewPostChange}

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
                                name="short_description_ro"
                                placeholder="Enter short_description_ro"
                                value={createPost.short_description_ro}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>short Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="short_description_ru"
                                placeholder="short Description RU"
                                value={createPost.short_description_ru}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>short Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="short_description_en"
                                placeholder="Enter short description en"
                                value={createPost.short_description_en}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="long_description_ro">
                            <Form.Label>Long Description RO</Form.Label>
                            <Form.Control
                                type="text"
                                name="long_description_ro"
                                placeholder="Enter long description_ro"
                                value={createPost.long_description_ro}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_ru">
                            <Form.Label>Long Description RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="long_description_ru"
                                placeholder="Enter long description_ru"
                                value={createPost.long_description_ru}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_en">
                            <Form.Label>Long Description EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="long_description_en"
                                placeholder="Enter long description_en"
                                value={createPost.long_description_en}
                                onChange={handleNewPostChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                        <Col sx={12} md={6}>
                            <Form.Group controlId="popular" className="mb-4">
                                <Form.Label>Popular</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="popular"
                                    value={createPost.popular}
                                    onChange={handleNewPostChange}
                                >
                                    <option value="">Select True or False</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </Form.Control>
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
                <Row>
                    <Col>
                        <Form.Group controlId="tags" className="mb-4">
                            <Form.Label>Select tags</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="tags"
                                value={createPost.tags}
                                onChange={handleNewPostChange}
                            >
                                {tags.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name_ro} / {item.name_ru} / {item.name_en}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
               <br/>
                <Button type="submit" variant="primary">
                    Submit Post
                </Button>

            </Form>
        </>
    );
}

export default PostCreate;