import {useTranslation} from "../providers";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import {fetchAnimalData, fetchEventsData, fetchPostsData, getAllTags} from "../utils/apiCalls.js";
import PaginationComponent from "../components/PaginationComponent.jsx";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";

function PostsPage() {
    const {t, language} = useTranslation();
    const [allNews, setAllNews] = useState([]);
    const [allAnimalsData, setAllAnimals] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const query = new URLSearchParams(location.search);
    const tagId = query.get('tag');

    // Fetch all data in one useEffect
    useEffect(() => {
        const getData = async () => {
            try {
                const [animalsData, eventsData, postsData, tagsData] = await Promise.all([
                    fetchAnimalData(),
                    fetchEventsData(),
                    fetchPostsData(),
                    getAllTags(),
                ]);
                setAllAnimals(animalsData.rows);
                setAllEvents(eventsData);
                setAllNews(postsData);
                setFilteredNews(postsData);
                setAllTags(tagsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    // Filter news based on the tag ID from the URL when the news data is fetched
    useEffect(() => {
        if (tagId) {
            const filtered = allNews?.filter(news =>
                news?.tags && news?.tags.some(tag => tag.id.toString() === tagId)
            );
            setFilteredNews(filtered);
            setCurrentPage(1);
        } else {
            setFilteredNews(allNews);
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
        setSearchQuery('');
        setFilteredNews(allNews); // Reset filtered news to show all
        setCurrentPage(1); // Reset to the first page
        navigate('/news'); // Reset filters and navigate to the news page
    };

    // Handle tag click
    const handleTagClick = (tagId) => {
        const filtered = allNews?.filter((item) =>
            item?.tags && item?.tags.some(tag => tag.id === tagId)
        );
        setFilteredNews(filtered);
    };

    // Filter news by popularity
    const popularNews = allNews?.filter(news => news.popular === true);

    // Extract unique tags from popular news
    const popularTags = useMemo(() => {
        const uniqueTagIds = Array.from(
            new Set(popularNews?.flatMap(news => news?.tags?.map(tag => tag.id)))
        );
        return uniqueTagIds
            .map(id => allTags?.find(tag => tag?.id === id))
            .filter(Boolean); // Remove undefined or null
    }, [popularNews, allTags]);


    // Pagination calculations
    const indexOfLastTender = currentPage * itemsPerPage;
    const indexOfFirstTender = indexOfLastTender - itemsPerPage;
    const currentNews = filteredNews?.slice(indexOfFirstTender, indexOfLastTender);
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    return (
        <div>
            <div className={"bg_banner_news"}>
                <div className={'pt-5 pb-5'}>&nbsp;</div>
                <div className="bg_banner_green height_280_no_mob">
                    &nbsp;
                </div>
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green'}>
                <span className="d-flex align-items-center">
                    <Link to={'/'} className="d-flex align-items-center">
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;
                    <Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link>
                </span>
            </div>
            <div className={"container"}>
                <h1 className={'text-center color_green'}>
                    <Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link>
                </h1>
                <p className={'text-center color_green'}>{t('ALL_NEWS_EVENTS')}</p>
                <br/>
                <Row>
                    <Col xs={12} md={8}>
                        <Row className="mt-4">
                            {currentNews?.map((item) => {
                                const day = new Date(item?.createdAt).toLocaleDateString('RO', {
                                    day: 'numeric',
                                });
                                const month = new Date(item?.createdAt).toLocaleDateString('RO', {
                                    month: 'long',
                                });
                                return (
                                    <Col xs={12} md={6} key={item.id} className="mb-4">
                                        <div
                                            onClick={() => navigate(`/news/${item.id}`)}
                                            className={'p-3 text-center d-flex flex-column justify-content-between bg_green color_white h-100'}
                                            style={{minHeight: '100%', cursor: 'pointer'}}
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
                                                <div>&nbsp;</div>
                                                {/* Placeholder for left-side space */}
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
                            <br/>
                        </Row>
                    </Col>
                    <Col xs={12} md={4} className={'mt-4 color_green'}>
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
                            <div className={'f_weight_700 color_green f_size_24 mt-4 mb-4'}>
                                {t('CATEGORIES')}</div>
                            <div className={'color_green mt-2 mb-3 border-bottom f_size_18'}><Link
                                to={'/events'}>{t('EVENTS')}</Link>&nbsp;({allEvents?.length})</div>
                            <div className={'color_green mt-2 mb-3 border-bottom f_size_18'}>
                                <Link to={'/news'} onClick={handleResetFilters}>{t('NEWS')}</Link>
                                &nbsp;({allNews?.length})
                            </div>
                            <div className={'color_green mt-2 border-bottom f_size_18'}><Link
                                to={'/animals'}>{t('ANIMALS')}</Link>&nbsp;({allAnimalsData?.length})</div>
                        <br/>
                            <div className={'f_weight_700 color_green f_size_18 mb-3'}>
                                <h4 className={'mt-4 mb-4 f_size_24 f_weight_700'}>{t('POPULAR_TAGS')}</h4>
                                {popularTags?.map((item) => (
                                    item && (
                                        <span key={item.id}>
            <Button
                variant="outline-success"
                className="p-2"
                style={{margin: '5px'}}
                onClick={() => handleTagClick(item.id)} // Handle tag click
            >
                <span>#{item?.[`name_${language}`]}</span>
            </Button>
        </span>
                                    )
                                ))}
                            </div>
                            <br/>
                            <h4 className={'mt-2 mb-3 f_size_24 f_weight_700'}>{t('POPULAR_POSTS')}</h4>
                            {popularNews?.map((item) => {
                                if (!item) return null; // Skip undefined items
                                {
                                    const day = new Date(item?.createdAt).toLocaleDateString('RO', {
                                        day: 'numeric',
                                    });
                                    const month = new Date(item?.createdAt).toLocaleDateString('RO', {
                                        month: 'long',
                                    });
                                    return (
                                        <div className="col-12 mb-3 bg_light_green" key={item.id}
                                             onClick={() => navigate(`/news/${item.id}`)}
                                             style={{cursor: 'pointer'}}
                                        >
                                            <div className={'p-2 f_size_16'}
                                                 style={{margin: '5px', fontStyle: 'italic'}}>
                                                {day} {month}
                                            </div>
                                            <h5 className={'p-2 f_weight_700'} style={{margin: '5px'}}>
                                                {item[`title_${language}`]}
                                            </h5>
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
                {/* Use the subscribe form component */}
                <SubscribeNewsForm/>
            </div>
        </div>
    );
}

export default PostsPage;