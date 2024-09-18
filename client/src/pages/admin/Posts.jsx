
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {deletePostById, fetchPostsData} from "../../utils/apiCalls";
import {useEffect, useState} from "react";

const Posts = () => {
    const [postsData, setPostsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPostsData();
                setPostsData(data);  // Store the list of animals
            } catch (error) {
                console.error('Error fetching posts data:', error);
            }
        };

        getData().then(r => console.log(r));
    }, []);

    console.log(postsData, 'postsData')

    const handleCreateNew = () => {
        navigate('/admin/posts/create');
    };

    const handleDelete = async (id) => {
        try {
            await deletePostById(id);
            setPostsData((prevData) => prevData.filter(post => post.id !== id));
            console.log('post deleted successfully');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h4>Posts List</h4>
                <Button variant={'outline-success'} onClick={handleCreateNew}>
                    Create New Post
                </Button>
            </div>

            <div className="mt-4" style={{background: 'lightcyan', padding: '15px', borderRadius: '8px'}}>
                {postsData.map((post) => (
                    <div className={'d-flex justify-content-between mb-2'}
                         style={{
                             border: '2px solid white',
                             borderRadius: '8px',
                             padding: '10px',
                             marginBottom: '10px'
                         }}
                         key={post.id}>
                        <div
                            className="me-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/admin/posts/${post.id}`)}
                        >
                            {post?.title_ro}
                        </div>
                        <Button
                            variant={'outline-danger'}
                            onClick={() => handleDelete(post.id)}>
                            <img src={'/icons/trash.svg'} alt="Delete" />
                        </Button>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Posts;
