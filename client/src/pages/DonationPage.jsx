import {Link} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {Button, Carousel, Col, Row} from "react-bootstrap";
import {useState} from "react";
import SubscribeNewsForm from "../components/SubscribeNewsForm.jsx";


function DonationPage() {
    const {t} = useTranslation();
    const [rangeValue, setRangeValue] = useState(10);

    // Function to handle slider change
    const handleRangeChange = (e) => {
        setRangeValue(e.target.value); // Update the state with the new value
    };


    return (
        <>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4 color_green'}>
                <span className="d-flex align-items-center">
                    <Link to={'/'} className="d-flex align-items-center">
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/donation'}>{t('DONATION')}</Link>
                </span>
            </div>

            <div className={"container"}>
                <h2 className={'text-center mt-5'}>{t('DONAT_1')}</h2>
                <div className={'text-center'}>{t('DONAT_2')}</div>
                <Row className={'mt-4'}>
                    <Col xs={12} md={6} className={'bg_light_green color_green'}>
                        <Row className={'mb-4 mt-4'}>
                            <Col xs={12} md={6} className="d-flex justify-content-center">
                                <img src={'/zebra_donat.jpg'} className={'img-fluid'} alt={'zebra'}/>
                            </Col>
                            <Col xs={12} md={6}>
                                <Row className={'mt-4'}>
                                    <Col>
                                        <img src={'/Dollar.svg'} className={'img-fluid'} alt={'carrot'}/>
                                        <h4 className={'mt-4 show-desktop color_green'}>65.245&nbsp;(1155965&nbsp;{t('LEI')})</h4>
                                    </Col>
                                    <Col>
                                        <div>
                                            <h4 className={'mt-4 show_mobile color_green'}>65.245&nbsp;(1155965&nbsp;{t('LEI')})</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={'mt-4'}>{t('DONAT_3_1')}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6} className={'bg_light_green color_green'}>
                        <Row className={'mb-4 mt-4'}>
                            <Col xs={12} md={6} className="d-flex justify-content-center">
                                <img src={'/carrot_donat.jpg'} className={'img-fluid'} alt={'zebra'}/>
                            </Col>
                            <Col xs={12} md={6}>
                                <Row className={'mt-4'}>
                                    <Col xs={12} md={12}>
                                        <img src={'/carrot.svg'} className={'img-fluid'} alt={'carrot'}/>
                                        <h4 className={'mt-4 show-desktop color_green'}>160kg {t('DONAT_3')}</h4>
                                    </Col>
                                    <Col>
                                        <div>
                                            <h4 className={'mt-4 show_mobile color_green'}>
                                                160kg {t('DONAT_3')}</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <div className={'mt-2'}>{t('DONAT_4')}</div>
                            </Col>
                        </Row>
                    </Col>

                    <div className={'bg_shape2 pt-5 mt-4'}>
                        <h2 className={'mt-5 mb-5 text-center'}>{t('DONAT_5')}</h2>
                        <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                            <div style={{width: '760px', height: '542px'}} className={'color_white bg_green mt-4'}>
                                <div style={{marginTop: '-28px'}}>
                                    {/*<div >*/}
                                    <Carousel>
                                        <Carousel.Item>
                                            <img
                                                src={'/elefant_donat.png'}
                                                className={'img-fluid mb-4'}
                                                alt={'donation'}
                                            />
                                            {/*<div>&nbsp;</div>*/}
                                            <p>{t('ELEFANT')}</p>
                                            <div>&nbsp;</div>

                                            {/*<Carousel.Caption>*/}
                                            {/*    <div >{t('ELEFANT')}</div>*/}
                                            {/*</Carousel.Caption>*/}
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                src={'/elefant_donat.png'}
                                                className={'img-fluid mb-4'}
                                                alt={'donation'}
                                            />
                                            <p>{t('ELEFANT')}</p>
                                            <div>&nbsp;</div>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                src={'/elefant_donat.png'}
                                                className={'img-fluid mb-4'}
                                                alt={'donation'}
                                            />
                                            <p>{t('ELEFANT')}</p>
                                            <div>&nbsp;</div>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                src={'/elefant_donat.png'}
                                                className={'img-fluid mb-4'}
                                                alt={'donation'}
                                            />
                                            <p>{t('ELEFANT')}</p>
                                            <div>&nbsp;</div>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                <h3 className={'color_yellow mt-4 mb-4'}>MDL {rangeValue}</h3> {/* Display the range value */}
                                <div>
                                    <input
                                        type="range"
                                        className="custom-range"
                                        min="10"
                                        max="1000"
                                        value={rangeValue}
                                        onChange={handleRangeChange} // Handle change event
                                    />
                                    <Row>
                                        <Col className={'f_size_13 text-secondary'}>min value 10</Col>
                                        <Col className={'f_size_13 text-secondary'}>max value 1000</Col>
                                    </Row>
                                </div>
                                <Button variant={'outline-warning mt-4'}>{t('DONAT_11')}</Button>
                            </div>
                        </div>
                        <br/>
                        {/* 3 Columns with Images and Text Underneath */}
                        <h2 className={'mt-4 mb-4 text-center'}>{t('DONAT_6')}</h2>
                        <Row className="text-center mt-5">
                            <Col xs={12} md={4}>
                                <div className={'bg_light_green'}>
                                    <div className={'bg_green p-1'}>
                                        <img src={'/donat.jpg'} className={'img-fluid mb-2'} alt={'Elephant'}/>
                                    </div>
                                    <p>{t('DONAT_7')}</p> {/* Text under the image */}
                                    <p>{t('DONAT_7_1')}</p> {/* Text under the image */}
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={'bg_light_green'}>
                                    <div className={'bg_green p-1'}>
                                        <img src={'/donat2.jpg'} className={'img-fluid mb-2'} alt={'Elephant'}/>
                                    </div>
                                    <p>{t('DONAT_8')}</p> {/* Text under the image */}
                                    <p>{t('DONAT_8_1')}</p> {/* Text under the image */}
                                </div>
                            </Col>
                            <Col xs={12} md={4} className={'bg_light_green'}>
                                <div className={'bg_light_green'}>
                                    <div className={'bg_green p-1'}>
                                        <img src={'/donat3.jpg'} className={'img-fluid mb-2'} alt={'Elephant'}/>
                                    </div>
                                    <p>{t('DONAT_9')}</p> {/* Text under the image */}
                                    <p>{t('DONAT_9_1')}</p> {/* Text under the image */}
                                </div>
                            </Col>
                        </Row>
                        <SubscribeNewsForm/>
                    </div>
                </Row>
            </div>
        </>
    );
}

export default DonationPage;