import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPostId, getTagsById, updateTagsData} from "../../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";

function TagsEdit() {
    const {id} = useParams();

    const [nameRU, setNameRU] = useState('');
    const [nameRO, setNameRO] = useState('');
    const [nameEN, setNameEN] = useState('');
    const [postTag, setPostTag] = useState();
    const [postTags, setPostTags] = useState([]);

    // Fetch tag data by ID when the component mounts
    useEffect(() => {
        const getTagData = async () => {
            try {
                const data = await getTagsById(id);
                console.log(data, 'data');
                setNameRU(data?.name_ru || '');
                setNameRO(data?.name_ro || '');
                setNameEN(data?.name_en || '');
                setPostTag(data?.postId);
            } catch (error) {
                console.error('Error fetching tag data:', error);
            }
        };
        getTagData();
    }, [id]); // Only runs when 'id' changes

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

    // Handle tag update submission
    const handleTagUpdate = async (event) => {
        event.preventDefault();
        const tagData = {
            name_ru: nameRU,
            name_ro: nameRO,
            name_en: nameEN,
        };

        try {
            const response = await updateTagsData(id, tagData);
            if (response) {
                console.log('Tag updated successfully:', response);
            }
        } catch (error) {
            console.error('Error while updating tag:', error);
        }
    };

    return (
        <div>
            <h4>Edit Tag for Post </h4>
            <br/>
            {postTags
                .filter((item) => item.id === postTag)
                .map((item) => (
                    <div key={item.id} style={{fontSize: "20px", color: 'green'}}>
                        {item.name_ro}
                    </div>
                ))
            }
            <br/>
            <Form onSubmit={handleTagUpdate}>
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
                <Button type="submit" variant="primary" className={'mt-4'}>
                    Save Tag Edit
                </Button>
            </Form>
        </div>
    );
}

export default TagsEdit;
