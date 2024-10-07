import {Link} from "react-router-dom";
import {useTranslation} from "../providers/index.js";
import {useEffect, useState} from "react";
import {getAllFAQ} from "../utils/apiCalls.js";
import {Accordion, Button, Col, Form, Row} from "react-bootstrap";


function QuestionsPage() {
    const {t, language} = useTranslation();
    const [questions, setQuestions] = useState([]);
    const [emailUser, setEmailUser] = useState([]);

    // get all faq
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllFAQ();

                setQuestions(data);  // Store the list of first event
            } catch (error) {
                console.error('Error fetching events data:', error);
            }
        };
        getData();
    }, []);

    return (
        <div>
            <div className={"bg_banner"}>
                <div className="bg_banner_green height_280">
                    &nbsp;
                </div>
                <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/news'}>{t('FAQ')}</Link>
                </span>
                </div>
            </div>
            <div className={"container"}>
                <Row>
                    <Col xs={2} className={'show-desktop'}>&nbsp;</Col>
                    <Col xs={12} md={8} className={'mt-3'}>
                        <h1 className={'text-center color_green'}>{t('FAQ')}</h1>
                        <br/>
                        <p className={'text-center color_green'}>{t('FAQ_2')}</p>
                    </Col>
                    <Col xs={2} className={'show-desktop'}>&nbsp;</Col>
                </Row>
                <br/>
                <Row className={'mt-5'}>


                    {questions.map((item) => (
                        <Col xs={12} md={6} key={item.id}>
                            <Accordion defaultActiveKey={['1']} alwaysOpen className="custom-accordion">
                                <Accordion.Item eventKey={item.id}>
                                    <Accordion.Header>{item[`question_${language}`]}</Accordion.Header>
                                    <Accordion.Body>
                                        {item[`answer_${language}`]}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    ))}

                </Row>

                <div className={'bg_shape2 pt-5'}>
                    <div className={'container'}>
                        <h2 className={'mt-5 mb-5 text-center'}>{t('NOT_FOUND_ANSWER')}</h2>
                        <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                        <Button variant={'outline-success'}> {t('CONTACT_US')}</Button>
                        </div>
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

            </div>
        </div>
    );
}

export default QuestionsPage;