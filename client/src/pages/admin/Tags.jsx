import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteTagsById, fetchPostId, getAllTags} from "../../utils/apiCalls.js";
import {Button, Col, Container, Row} from "react-bootstrap";

const Tags = () => {

    const [tagsData, setTagsData] = useState([]);  // List of all tags
    const [postTags, setPostTags] = useState([]);  // List of all posts
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllTags();
                setTagsData(data);  // Store the list of tags
            } catch (error) {
                console.error('Error fetching Tags data:', error);
            }
        };

        getData();
    }, []);

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

    const handleDelete = async (id) => {
        try {
            await deleteTagsById(id);
            setTagsData((prevData) => prevData.filter(event => event.id !== id));
            console.log('Tag deleted successfully');
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    const handleCreateNew = () => {
        navigate('/admin/tags/create');
    };

    return (
        <Container>

            <div className={'d-flex justify-content-between mt-4'}>
                <h2>Tags List</h2>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Tag
                </Button>
            </div>
            <div className="mt-4"
                 style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}
            >
                <Row className="align-items-center" style={{color: 'gray', fontWeight: 'bold'}}>
                    <Col>Tag Name</Col>
                    <Col>Post Name</Col>
                    <Col>&nbsp;</Col>
                </Row>
                {tagsData.map((item) => {
                    const post = postTags.find(post => post.id === item.postId);  // Find the post for the current tag
                    return (
                        <div
                            key={item.id}
                            style={{
                                border: '1px solid white',
                                borderRadius: '8px',
                                padding: '10px',
                                marginBottom: '10px'
                            }}
                        >

                            <Row className="align-items-center">
                                <Col>
                                    <div
                                        className="me-2"
                                        onClick={() => navigate(`/admin/tags/${item.id}`)}
                                        style={{cursor: 'pointer', fontWeight: 'bold'}}
                                    >
                                        {item?.name_ro}
                                        <img
                                            src={'/icons/pencil.svg'}
                                            alt="Edit"
                                            style={{
                                                width: '20px',
                                                marginLeft: '10px',
                                                cursor: 'pointer'
                                            }}
                                            // onClick={() => navigate(`/admin/tags/edit/${item.id}`)}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div
                                        onClick={() => navigate(`/admin/tags/${item.id}`)}
                                        style={{cursor: 'pointer', color: 'green'}}
                                    >
                                        {post?.name_ro ? post.name_ro : "No post found"}
                                    </div>
                                </Col>
                                <Col className="text-end">
                                    <Button
                                        variant={'outline-danger'}
                                        onClick={() => handleDelete(item.id)}
                                        style={{borderRadius: '50%', padding: '5px'}}
                                    >
                                        <img src={'/icons/trash.svg'} alt="Delete" style={{width: '20px'}}/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </div>

        </Container>
    );
};

export default Tags;
