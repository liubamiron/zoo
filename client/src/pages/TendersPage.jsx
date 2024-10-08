import { Link } from "react-router-dom";
import { useTranslation } from "../providers/index.js";
import { useEffect, useState } from "react";
import {createEmailSubscribe, fetchTenderData, fetchTypeTenderData} from "../utils/apiCalls.js";
import {Button, Col, Form, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.jsx";

function TendersPage() {
    const { t, language } = useTranslation();
    const [allTenders, setAllTenders] = useState([]);
    const [typeTenders, setTypeTenders] = useState([]);
    const [filteredTenders, setFilteredTenders] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [emailUser, setEmailUser] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const tendersPerPage = 10; // Number of tenders to display per page

    // Get all tenders
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTenderData();
                setAllTenders(data);
                setFilteredTenders(data); // Set initial tenders to all tenders
            } catch (error) {
                console.error("Error fetching tenders data:", error);
            }
        };
        getData();
    }, []);

    // Get type of tenders
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchTypeTenderData();
                setTypeTenders(data);
            } catch (error) {
                console.error("Error fetching tender types data:", error);
            }
        };
        getData();
    }, []);

    // Handle tender type button click
    const handleTypeClick = (typeId) => {
        setSelectedType(typeId);
        setCurrentPage(1); // Reset to first page when filter changes
        if (typeId) {
            const filtered = allTenders.filter((tender) => tender.typeTenderId === typeId);
            setFilteredTenders(filtered);
        } else {
            setFilteredTenders(allTenders);
        }
    };

    // Pagination calculations
    const indexOfLastTender = currentPage * tendersPerPage;
    const indexOfFirstTender = indexOfLastTender - tendersPerPage;
    const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);
    const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const data = await createEmailSubscribe({ email: emailUser }); // Call the createEmailSubscribe function
            setResponseMessage(data.message || 'Email sent successfully!'); // Set the response message
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to send email. Please try again.');
        }
    };

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">&nbsp;</div>
                <div className={"mt-4 text-center d-flex justify-content-center align-items-center mb-4"}>
                    <span>
                        <Link to={"/"}>
                            <img src={"/house.svg"} className={"img-fluid"} alt={"house"} style={{ marginRight: "5px" }} />
                            ZOO
                        </Link>
                        &nbsp;&#62;&nbsp;
                        <Link to={"/news"}>{t("TENDER")}</Link>
                    </span>
                </div>
            </div>
            <div className={"container"}>
                <h1 className={"text-center color_green"}>{t("TENDER_1")}</h1>
                <p className={"text-center color_green"}>{t("TENDER_2")}</p>

                <br />
                <div className={"container"}>
                    <div className={"mb-5 d-flex justify-content-center text-center"}>
                        <Button
                            variant={"outline-success"}
                            key={"all"}
                            className={"p-2 m-1"}
                            onClick={() => handleTypeClick(null)}
                        >
                            {t("All Tenders")}
                        </Button>
                        {typeTenders?.map((item) => (
                            <Button
                                variant={"outline-success"}
                                key={item.id}
                                className={` p-2 m-1 ${selectedType === item.id ? "active" : ""}`}
                                onClick={() => handleTypeClick(item.id)}
                            >
                                {item[`name_${language}`]}
                            </Button>
                        ))}
                    </div>

                    {/* Render tenders */}
                    <Row>
                        <Col xs={12} md={8}>
                            <h3 className={"color_green mt-2 mb-5"}>{t("NAME_DOC")}</h3>
                        </Col>
                        <Col xs={12} md={4}>
                            <h3 className={"color_green mt-2 mb-5 text-end"}>{t("DOC")}</h3>
                        </Col>
                    </Row>
                    {currentTenders?.map((item) => (
                        <Row key={item.id} className={"bg_light_green"}>
                            <Col xs={12} md={8}>
                                <div className={"mb-2 border-bottom p-4 color_green"}>
                                    {item[`title_${language}`]}
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={"mb-2 border-bottom p-4 color_green"}>
                                    <div className={"text-end"}>
                                        <a
                                            href={`${import.meta.env.VITE_URL}/${item.pdf_file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ color: "green" }}
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ))}
                    {/* Pagination */}
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                    <Row  className={'bg_green p-3 mt-5'}>
                        <Col>
                            <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
                        </Col>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Row className={'color_white mt-4'}>
                                    <Col>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                type="email"
                                                value={emailUser}
                                                onChange={(e) => setEmailUser(e.target.value)} // Update state with the email input
                                                placeholder={t('ENTER_EMAIL')} // Placeholder from translations
                                                required // Make sure the input is required
                                            />
                                        </Form.Group>
                                        {responseMessage && <p>{responseMessage}</p>}
                                    </Col>
                                    <Col>
                                        <Button variant={'outline-warning'} type="submit">{t('SUBSCRIBE')}</Button>
                                    </Col>

                                    <div className={'mt-2 '} style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_1')}</div>
                                    <div style={{fontSize: '12px'}}>{t('ADDITIONAL_TEXT_2')}</div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default TendersPage;
