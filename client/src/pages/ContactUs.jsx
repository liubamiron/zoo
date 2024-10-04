import {useTranslation} from "../providers/index.js";
import {Link} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';


function ContactUs() {
    const {t, language} = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const position = [46.97302, 28.86761];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Add form submission logic here (API call, etc.)
    };

    return (
        <>
        <div className={"bg_banner"}>
            <div className="bg_banner_green height_280">
                &nbsp;
            </div>
            <div className={'mt-4 text-center d-flex justify-content-center align-items-center mb-4'}>
                <span> <Link to={'/'}>
                    <img src={'/house.svg'} className={'img-fluid'} alt={'house'} style={{marginRight: '5px'}}/>
                    ZOO</Link>&nbsp;&#62;&nbsp;<Link to={'/contact_us'}>{t('CONTACTS')}</Link>
                </span>
            </div>
        </div>
            <div className={"container"}>
                <h3 className={'text-center'}> {t('CONTACTS_TITLE')}</h3>
                <br/>
                <Row className={'mb-5'}>
                    <Col sx={12} md={2}>
                        &nbsp;
                    </Col>
                    <Col sx={12} md={8}>
                        <div className={'text-center mt-4'}> {t('CONTACTS_1')}</div>
                        <br/>
                        <div> {t('CONTACTS_2')}</div>
                    </Col>
                    <Col sx={12} md={2}>
                        &nbsp;
                    </Col>
                </Row>
                <div>
                    {/*<MapContainer center={position} zoom={15} style={{ height: '400px', width: '1000px' }}>*/}
                    <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>
                                This is your location! {/* Add any relevant information */}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <br/>
                <br/>
                <Row>
                    <Col xs={12} md={8}>
                        <Row>
                            <Col xs={12} md={4}>
                                <div className={'bg_light_green color_green p-2'}>
                                    <h5 className="d-flex align-items-center">&nbsp;
                                        <img src={'/icons/map_marker.svg'} alt={'map'}/>&nbsp;{t('ADDRESS')}</h5>
                                    <div>{t('ADDRESS_1')}</div>
                                    <div>{t('ADDRESS_2')}</div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={'bg_light_green color_green p-2'}>
                                    <h5 className="d-flex align-items-center">&nbsp;
                                        <img src={'/icons/mail_marker.svg'} alt={'mail'}/>&nbsp;{t('MAIL')}</h5>
                                    <div>{t('MAIL_1')}</div>
                                    <div>{t('MAIL_2')}</div>
                                </div>
                            </Col>
                            <Col xs={12} md={4}>
                                <div className={'bg_light_green color_green p-2'}>
                                    <h5 className="d-flex align-items-center">&nbsp;
                                        <img src={'/icons/phone_marker.svg'} alt={'phone'}/>&nbsp;{t('PHONE')}</h5>
                                    <div>{t('PHONE_1')}</div>
                                    <div>{t('PHONE_2')}</div>
                                </div>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit} className="mt-4">
                            <Row className="mb-3">
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="formMessage" className="mb-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={8}
                                    placeholder="Enter your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="outline-success" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className={'bg_green color_white p-4'}
                             style={{lineHeight: '50px'}}>
                            <h3 className={'mb-4'}>{t('HOURS')}</h3>
                            <div>{t('MONDAY')} 10:00 {t('TILL')} 18:00</div>
                            <div>{t('TUESDAY')} 10:00 {t('TILL')} 16:00</div>
                            <div>{t('WEDNESDAY')} 10:00 {t('TILL')} 16:00</div>
                            <div>{t('THURSDAY')} 10:00 {t('TILL')} 16:00</div>
                            <div>{t('FRIDAY')} 10:00 {t('TILL')} 16:00</div>
                            <div>{t('SATURDAY')} 10:00 {t('TILL')} 16:00</div>
                            <div>{t('SUNDAY')} 10:00 {t('TILL')} 16:00</div>
                        </div>
                    </Col>
                </Row>
                <br/>
            </div>
        </>

    );
}

export default ContactUs;