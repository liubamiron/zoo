import { Link } from "react-router-dom";
import { useTranslation } from "../providers/index.js";
import { useEffect, useState } from "react";
import { fetchTenderData, fetchTypeTenderData} from "../utils/apiCalls.js";
import {Button, Col, Row} from "react-bootstrap";
import PaginationComponent from "../components/PaginationComponent.jsx";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";

function TendersPage() {
    const { t, language } = useTranslation();
    const [allTenders, setAllTenders] = useState([]);
    const [typeTenders, setTypeTenders] = useState([]);
    const [filteredTenders, setFilteredTenders] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

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


    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">&nbsp;</div>
            </div>
            <div className="mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green">
                <span className="d-flex align-items-center">
                    <Link to="/" className="d-flex align-items-center">
                            <img src={"/house.svg"} className={"img-fluid"} alt={"house"} style={{marginRight: "5px"}}/>
                            ZOO
                        </Link>
                    &nbsp;&#62;&nbsp;
                    <Link to={"/news"}>{t("TENDER")}</Link>
                    </span>
            </div>
            <div className={"container"}>
                <h1 className={"text-center color_green"}>{t("TENDER_1")}</h1>
                <p className={"text-center color_green"}>{t("TENDER_2")}</p>

                <br/>
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
                                            style={{color: "green"}}
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
                    <SubscribeNewsForm/>
                </div>
            </div>
        </div>
    );
}

export default TendersPage;
