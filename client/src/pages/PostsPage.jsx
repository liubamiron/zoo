import {useTranslation} from "../providers/index.js";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {fetchPostsData, getAllTags} from "../utils/apiCalls.js";
import PaginationComponent from "../components/PaginationComponent.jsx";

function PostsPage() {
    const {t, language} = useTranslation();
    const [allNews, setAllNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]); // State for filtered news
    const [allTags, setAllTags] = useState([]);
    const [emailUser, setEmailUser] = useState('');
    const [selectedTag, setSelectedTag] = useState(null); // State for the selected tag
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const itemsPerPage = 6; // Number of tenders to display per page

    const query = new URLSearchParams(location.search);
    const tagId = query.get('tag'); // Get the tag ID from the URL

    // Fetch all posts

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPostsData();
                setAllNews(data);  // Store the list of animals
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

    // Filter news based on the tag ID from the URL when the news data is fetched
    useEffect(() => {
        if (tagId) {
            const filtered = allNews.filter(news =>
                news.tags && news.tags.some(tag => tag.id.toString() === tagId)
            );
            setFilteredNews(filtered);
            setCurrentPage(1); // Reset to the first page when filtering
        } else {
            setFilteredNews(allNews); // Show all news if no tag is selected
        }
    }, [tagId, allNews]);

    // Handle Search
    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredNews([...allNews]);
        } else {
            const filtered = allNews.filter((item) =>
                item[`title_${language}`].toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNews(filtered);
        }
    };

    // Reset filters when the link to news is clicked
    const handleResetFilters = () => {
        setSelectedTag(null);
        setSearchQuery('');
        setFilteredNews(allNews); // Reset filtered news to show all
        setCurrentPage(1); // Reset to the first page
    };

    // Handle tag click
    const handleTagClick = (tagId) => {
        setSelectedTag(tagId); // Update the selected tag
        const filtered = allNews.filter((item) =>
            item.tags && item.tags.some(tag => tag.id === tagId)
        );
        setFilteredNews(filtered);
    };

    // Pagination calculations
    const indexOfLastTender = currentPage * itemsPerPage;
    const indexOfFirstTender = indexOfLastTender - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstTender, indexOfLastTender);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link>
                </span>
                </div>
            </div>
            <div className={"container"}>
            <h1 className={'text-center color_green'}><Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link></h1>
            <p className={'text-center color_green'}>{t('ALL_NEWS_EVENTS')}</p>
                <br/>
                <Row>
                    <Col xs={12} md={8}>
                        <Row className="mt-4">
                            {/*{filteredNews.map((item) => {*/}
                            {currentNews.map((item) => {
                                const day = new Date(item.createdAt).toLocaleDateString('RO', {
                                    day: 'numeric',
                                });
                                const month = new Date(item.createdAt).toLocaleDateString('RO', {
                                    month: 'long',
                                });
                                return (
                                    <Col xs={12} md={6} key={item.id} className="mb-4">
                                        <div
                                            onClick={() => navigate(`/news/${item.id}`)}
                                            className={'p-3 text-center d-flex flex-column justify-content-between bg_green color_white h-100'}
                                            style={{ minHeight: '100%', cursor: 'pointer' }}
                                        >
                                            <div
                                                style={{
                                                    backgroundImage: `url(${import.meta.env.VITE_URL}/${item.img_1})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    height: '240px',
                                                    width: '100%',
                                                    display: 'flex', // Use flexbox for layout
                                                    justifyContent: 'space-between', // Push date to right
                                                    alignItems: 'flex-start', // Align date at the top
                                                    padding: '10px', // Add padding for spacing
                                                }}
                                            >
                                                <div>&nbsp;</div> {/* Placeholder for left-side space */}
                                                <div
                                                    style={{
                                                        backgroundColor: '#F2C83F',
                                                        padding: '5px 10px',
                                                        borderRadius: '4px',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {day} <br/> {month}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column justify-content-between flex-grow-1">
                                                <div className={'f_size_13 mb-2'}>{item[`title_${language}`]}</div>
                                                <p>{item[`short_description_${language}`]}</p>
                                                <div className={'f_size_14 color_yellow'}>{t("MORE_INFO")}</div>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                            <br />
                        </Row>
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
                            <div className={'color_green mt-2 mb-3 border-bottom'}><Link to={'/events'}>{t('EVENTS')}</Link></div>
                        <div className={'color_green mt-2 mb-3 border-bottom'}>
                            <Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link>
                        </div>
                            <div className={'color_green mt-2 mb-3 border-bottom'}><Link to={'/animals'}>{t('ANIMALS')}</Link></div>
                        <br/>
                        <div className={'f_weight_700 color_green f_size_18 mb-3'}>
                            {t('POPULAR_TAGS')}
                            <br/>
                            <br/>
                            {allTags.map((item) => (
                                <span key={item.id}>
                                    <Button
                                        variant={selectedTag === item.id ? "success" : "outline-success"}
                                        className={'p-2'}
                                        style={{ margin: '5px' }}
                                        onClick={() => handleTagClick(item.id)} // Handle tag click
                                    >
                                        <span >{item[`name_${language}`]}</span>
                                        </Button>
                                </span>
                            ))}
                        </div>
                        <br/>
                        <div className={'f_weight_700 color_green f_size_18 mb-3'}>
                            {t('POPULAR_POSTS')}
                            <br/>
                            <br/>
                        </div>
                            {allNews.map((item) => {
                                {
                                    const day = new Date(item.createdAt).toLocaleDateString('RO', {
                                        day: 'numeric',
                                    });
                                    const month = new Date(item.createdAt).toLocaleDateString('RO', {
                                        month: 'long',
                                    });
                                    return (
                                        <div className="col-12 mb-3 bg_light_green color_green" key={item.id}
                                             onClick={() => navigate(`/news/${item.id}`)}
                                             style={{cursor: 'pointer'}}
                                        >
                                            <div className={'p-2 f_size_13'} style={{margin: '5px'}}>
                                                {day} {month}
                                            </div>
                                            <h4 className={'p-2'} style={{margin: '5px'}}>
                                                {item[`title_${language}`]}
                                            </h4>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </Col>
                    {/* Pagination */}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
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

export default PostsPage;