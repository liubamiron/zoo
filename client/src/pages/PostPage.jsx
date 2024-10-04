import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {useEffect, useState} from "react";
import {fetchPostsById, fetchPostsData, getAllTags} from "../utils/apiCalls.js";
import {Button, Col, Form, Image, InputGroup, Row} from "react-bootstrap";


function PostPage() {
    const {t, language} = useTranslation();
    const [post, setPost] = useState([]);
    const [allNews, setAllNews] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [emailUser, setEmailUser] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPostsById(id);
                setPost(data)
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'animals data'));
    }, [id]);

    // Fetch all posts

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPostsData();
                setAllNews(data);
                setFilteredNews(data);
            } catch (error) {
                console.error('Error fetching animals data:', error);
            }
        };
        getData().then(r => console.log(r, 'animals data'));
    }, []);

    // Fetch all tags
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllTags();
                setAllTags(data);
            } catch (error) {
                console.error('Error fetching posts data:', error);
            }
        };
        getData();
    }, []);

    // Extract unique tags from the animals array
    const uniqueTags = [
        ...new Map(
            allNews.flatMap(item => item.tags.map(tag => [tag.id, tag]))
        ).values()
    ];

    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredNews([...allNews]);
        } else {
            const filtered = allNews.filter((item) =>
                item[`title_${language}`].toLowerCase().includes(searchQuery.toLowerCase())
            );

            setFilteredNews(filtered);

            // If exactly one match, navigate to its detail page
            if (filtered.length === 1) {
                const matchedNews = filtered[0];
                navigate(`/news/${matchedNews.id}`);
            }
        }
    };
    console.log('news, tags', filteredNews, uniqueTags);

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/news'}>{t('NEWS')}</Link>
                </span>
                </div>
            </div>
            <div className={"container"}>
                <h2 className={'text-center color_green mt-2 mb-2'}>{post[`title_${language}`]}</h2>
                <br/>
                <Row>
                    <Col xs={12} md={8} className={'mt-3'}>
                        <div className={'d-flex justify-content-center align-items-center bg_green'}>
                            <Image
                                src={`${import.meta.env.VITE_URL}/${post.img_1}`}
                                alt={post[`name_${language}`]}
                                className={'img-fluid'}
                            />
                        </div>
                        <div className={'bg_light_green p-4'}>
                            <div className={'f_size_13'}>{post[`name_${language}`]}</div>
                            <br/>
                            <h2>{post[`title_${language}`]}</h2>
                            <br/>
                            <p>{post[`short_description_${language}`]}</p>
                            <p>{post[`long_description_${language}`]}</p>
                            <h6 className={'color_green'}>Tags:</h6>
                            {post?.tags?.map((item) => (
                                <span key={item.id} className={'p-2 color_green'}>{item[`name_${language}`]}</span>
                            ))}
                        </div>
                    </Col>
                    <Col xs={12} md={4} className={'mt-4'}>
                        <div>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder={t('SEARCH_BY_TITLE_NEWS')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                                    className="custom-search-input"
                                />
                                <Button variant="success" onClick={handleSearch}>
                                    {t('SEARCH')}
                                </Button>
                            </InputGroup>
                            <br/>
                            <div className={'f_weight_700 color_green f_size_18 mb-3'}>
                                {t('CATEGORIES')}</div>
                            <div className={'color_green mt-2 mb-3 border-bottom'}>{t('ALL')}</div>
                            <div className={'color_green mt-2 mb-3 border-bottom'}>{t('EVENTS')}</div>
                            <div className={'color_green mt-2 mb-3 border-bottom'}>{t('NEWS')}</div>
                            <div className={'color_green mt-2 mb-3 border-bottom'}>{t('ANIMALS')}</div>
                            <br/>
                            <div className={'color_green mb-3'}>
                                <h4 className={'mt-2 mb-3'}>{t('POPULAR_TAGS')}</h4>
                                <br/>
                                {/*<br/>*/}
                                {allTags.map((item) => (
                                    <span key={item.id}>
                                    <Button
                                        variant={"outline-success"}
                                        className={'p-2'}
                                        style={{margin: '5px'}}
                                        onClick={() => navigate(`/news?tag=${item.id}`)}
                                    >
                                        <span>{item[`name_${language}`]}</span>
                                        </Button>
                                </span>
                                ))}
                            </div>
                            <br/>
                            <div className={'color_green  mb-3'}>
                                <h4 className={'mt-2 mb-3'}>{t('POPULAR_POSTS')}</h4>
                                <br/>
                                {allNews.map((item) => {
                                    const day = new Date(item.createdAt).toLocaleDateString('RO', {
                                        day: 'numeric',
                                    });
                                    const month = new Date(item.createdAt).toLocaleDateString('RO', {
                                        month: 'long',
                                    });

                                    return (
                                        <div
                                            className="col-12 mb-3 bg_light_green"
                                            key={item.id}
                                            onClick={() => navigate(`/news/${item.id}`)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            <div className={'p-2 f_size_13'} style={{margin: '5px'}}>
                                                {day} {month}
                                            </div>
                                            <h4 className={'p-2'} style={{margin: '5px'}}>
                                                {item[`title_${language}`]}
                                            </h4>
                                            {/* Displaying Tags */}
                                            <div>
                                                {item.tags.map((tag) => (
                                                <span
                                                    key={tag.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent the click from propagating to the news item
                                                        navigate(`/news/${item.id}`);
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        margin: '0 5px',
                                                        padding: '2px',
                                                        fontSize: '13px',
                                                        textTransform: 'lowercase',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                    {tag.name_ro}
                                </span>
                                            ))}
                                            </div>
                                        </div>
                                    );
                                })}

                                <br/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className={'bg_green p-3 mt-5'}>
                    <Col>
                        <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
                    </Col>
                    <Col>
                        <Row className={'color_white mt-4'}>
                            <Col>
                                <Form.Group controlId="nameEN">
                                    <Form.Control
                                        type="email"
                                        value={emailUser}
                                        onChange={(e) => setEmailUser(e.target.value)} // Use a function to update state
                                        placeholder={t('ENTER_EMAIL')}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button variant={'outline-warning'}>{t('SUBSCRIBE')}</Button>
                            </Col>
                            <div className={'mt-2 '} style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_1')}</div>
                            <div style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_2')}</div>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PostPage;