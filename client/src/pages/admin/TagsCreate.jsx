import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createTagsData, fetchPostId, updateTagsData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";

function TagsCreate() {
    const {id} = useParams();

    const [nameRU, setNameRU] = useState('');
    const [nameRO, setNameRO] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [postId, setPostId] = useState('');  // This is where we'll store the selected postId
    const [postTags, setPostTags] = useState([]);

    // Fetch post IDs
    useEffect(() => {
        const getPostId = async () => {
            try {
                const data = await fetchPostId();
                setPostTags(data);
            } catch (error) {
                console.error('Error fetching post id:', error);
            }
        };
        getPostId();
    }, []);

    // Handle tag creation submission
    const handleTagCreate = async (event) => {
        event.preventDefault();
        const tagData = {
            name_ru: nameRU,
            name_ro: nameRO,
            name_en: nameEN,
            postId: postId  // Use the selected postId from the dropdown
        };

        try {
            const response = await createTagsData(tagData);
            if (response) {
                console.log('Tag created successfully:', response);
            }
        } catch (error) {
            console.error('Error while creating tag:', error);
        }
    };

    return (
        <div>
            <h4>Create New Tag for Post</h4>
            <br/>
            <Form onSubmit={handleTagCreate}>
                <Row className={'mt-4 mb-5'}>
                    <Col>
                        <Form.Label>Tag RO</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameRO}
                            onChange={(event) => setNameRO(event.target.value)}
                            placeholder="Enter name RO"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Tag RU</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameRU}
                            onChange={(event) => setNameRU(event.target.value)}
                            placeholder="Enter name RU"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Tag EN</Form.Label>
                        <Form.Control
                            type="text"
                            value={nameEN}
                            onChange={(event) => setNameEN(event.target.value)}
                            placeholder="Enter name EN"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="postId" className="mb-4">
                            <Form.Label>Select Post</Form.Label>
                            <Form.Control
                                as="select"
                                name="postId"
                                value={postId}  // Set postId instead of postTag
                                onChange={(event) => setPostId(event.target.value)}  // Handle postId selection
                            >
                                <option value="">Select a post</option> {/* Placeholder option */}
                                {postTags.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name_ro}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="primary" className={'mt-4'}>
                    Save New Tag
                </Button>
            </Form>
        </div>
    );
}

export default TagsCreate;
