import { useEffect, useState } from "react";
import {
    fetchPostsById,
    updatePostData,
    getAllTags
} from "../../utils/apiCalls.js";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function PostEdit() {
    const { id } = useParams(); // Get the animal ID from the URL
    const [tags, setTags] = useState([]);
    const [post, setPost] = useState({
        name_ro: '',
        name_ru: '',
        name_en: '',
        title_ro: '',
        title_ru: '',
        title_en: '',
        short_description_ru: '',
        short_description_ro: '',
        short_description_en: '',
        long_description_ru: '',
        long_description_ro: '',
        long_description_en: '',
        popular: '',
        types: [],
        img_1: '',
        img_2: '',
    })

    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');


    const getPost = async () => {
        try {
            const data = await fetchPostsById(id);
            setPost(data);

            // Safely handle types, default to empty array if undefined
            setPost((prev) => ({
                ...prev,
                tags: data.tags ? data.tags.map((tag) => tag.id) : [],
            }));
        } catch (err) {
            console.error('Error fetching animal data:', err);
        }
    };

    const getTags = async () => {
        try {
            const data = await getAllTags();
            setTags(data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    useEffect(() => {
        getPost(); // Fetch animal data on mount
        getTags();  // Fetch types on mount
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setPost({ ...post, tags: selectedOptions });
    };

    const handleImg1Change = (e) => {
        setImg1(e.target.files[0]);
    };

    const handleImg2Change = (e) => {
        setImg2(e.target.files[0]);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name_ro', post.name_ro);
        formData.append('name_ru', post.name_ru);
        formData.append('name_en', post.name_en);
        formData.append('title_ro', post.title_ro);
        formData.append('title_ru', post.title_ru);
        formData.append('title_en', post.title_en);
        formData.append('short_description_ru', post.short_description_ru);
        formData.append('short_description_ro', post.short_description_ro);
        formData.append('short_description_en', post.short_description_en);
        formData.append('long_description_ru', post.long_description_ru);
        formData.append('long_description_ro', post.long_description_ro);
        formData.append('long_description_en', post.long_description_en);
        formData.append('popular', post.popular);
        formData.append('img_1', img1);
        formData.append('img_2', img2);
        formData.append('tags', JSON.stringify(post.tags)); // Handle array properly

        try {
            await updatePostData(id, formData)
        } catch (err) {
            console.error('Error updating animal:', err);
        }
    };

    console.log(tags, 'tags')


    return (
        <>
            <h4>Edit Blog Post</h4>
            <br />
            <Form onSubmit={handleSubmit}>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="name_ro">
                            <Form.Label>NameRO</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ro"
                                placeholder="Enter Name RO"
                                value={post.name_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_ru">
                            <Form.Label>Name RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_ru"
                                placeholder="Enter Name RU"
                                value={post.name_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="name_en">
                            <Form.Label>Name EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="name_en"
                                placeholder="Enter Name EN"
                                value={post.name_en}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col>
                        <Form.Group controlId="title_ro">
                        <Form.Label>Title RO</Form.Label>
                        <Form.Control
                            type="text"
                            name="title_ro"
                            placeholder="Enter Title RO"
                            value={post.title_ro}
                            onChange={handleInputChange}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_ru">
                            <Form.Label>Title RU</Form.Label>
                            <Form.Control
                                type="text"
                                name="title_ru"
                                placeholder="Enter title ru"
                                value={post.title_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="title_en">
                            <Form.Label>Title EN</Form.Label>
                            <Form.Control
                                type="text"
                                name="title_en"
                                placeholder="Enter Title EN"
                                value={post.title_en}
                                onChange={handleInputChange}
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
                                rows={6}
                                name="short_description_ro"
                                placeholder="Enter short description"
                                value={post.short_description_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_ru">
                            <Form.Label>short Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="short_description_ru"
                                placeholder="Enter short Description RU"
                                value={post.short_description_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="short_description_en">
                            <Form.Label>short Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="short_description_en"
                                placeholder="Enter short description en"
                                value={post.short_description_en}
                                onChange={handleInputChange}
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
                                rows={8}
                                name="long_description_ro"
                                placeholder="Long Description RO"
                                value={post.long_description_ro}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_ru">
                            <Form.Label>Long Description RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                name="long_description_ru"
                                placeholder="Long Description RU"
                                value={post.long_description_ru}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="long_description_en">
                            <Form.Label>Long Description EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                name="long_description_en"
                                placeholder="Long Description EN"
                                value={post.long_description_en}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col sx={12} md={4}>
                        <Form.Group controlId="popular" className="mb-4">
                            <Form.Label>Popular post</Form.Label>
                            <Form.Control
                                as="select"
                                name="popular"
                                value={post.popular === true ? 'true' : 'false'}  // ensure boolean handling
                                onChange={(e) => setPost({ ...post, popular: e.target.value === 'true' })}  // convert to boolean
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
                        <Form.Group controlId="tags" className="mb-4">
                            <Form.Label>Select tags</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name="tags"
                                value={post.tags}
                                onChange={handleTagChange}
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
                <Row className={'mt-4'}>
                    <Col>
                        <div>Img&nbsp;1</div>&nbsp;
                    <div className="d-flex align-items-center">
                        <img
                            src={`${import.meta.env.VITE_URL}/${post.img_1}`}
                            alt="img1"
                            className="img-fluid"
                        />
                    </div>
                    </Col>
                    <Col>
                        <div>Img&nbsp;2</div>&nbsp;
                    <div className="d-flex align-items-center">
                        <img
                            src={`${import.meta.env.VITE_URL}/${post.img_2}`}
                            alt="img2"
                            className="img-fluid"
                        />
                    </div>
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

                <Button variant="primary" type="submit" className={'mt-4'}>
                    Update Post
                </Button>
            </Form>

        </>
    );
}

export default PostEdit;
