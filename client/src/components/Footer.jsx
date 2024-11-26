import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "../providers/index.js";

function Footer() {
    const { t } = useTranslation();

    return (
        <>
            <div style={{ paddingTop: '40px', textAlign: 'center' }} className={'bg_bone'}>
                <br />
                <Container>
                    <br />
                    <div className={'pad_top_55_15'}>
                        <Row>
                            {/* Column 1 */}
                            <Col xs={12} md={6} className="mb-4 mb-md-0">
                                <Link to={'/'} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={'/logo_svg.svg'}
                                        alt="Chisinau Zoo Logo"
                                        className={'img-fluid'}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <span style={{ color: '#0A4D1E', fontWeight: '600', fontSize: '18px' }}>
                                        ZOO Chisinau
                                    </span>
                                </Link>
                                <br/>
                                <div className={'text-start show-desktop'}>Grădină Zoologică mun.Chișinău</div>
                                <div className={'text-center show_mobile'}>Grădină Zoologică mun.Chișinău</div>
                            </Col>

                            {/* Column 2 */}
                            <Col xs={12} md={2} className="mb-4 mb-md-0">
                                <h5 style={{ color: '#0A4D1EFC' }}>{t('NAVIGATION')}</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/about">{t('ABOUT')}</Link></li>
                                    <li><Link to="/contacts">{t('CONTACTS_TITLE')}</Link></li>
                                    <li><Link to="/questions">{t('FAQ')}</Link></li>
                                </ul>
                            </Col>

                            {/* Column 3 */}
                            <Col xs={12} md={2} className="mb-4 mb-md-0">
                                <h5 style={{ color: '#0A4D1EFC' }}>{t('RESOURCES')}</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/tender">{t('GOS_BUY')}</Link></li>
                                    <li><Link to="/gallery">{t('GALLERY')}</Link></li>
                                    <li><Link to="/events">{t('EVENTS')}</Link></li>
                                </ul>
                            </Col>

                            {/* Column 4 */}
                            <Col xs={12} md={2}>
                                <h5 style={{ color: '#0A4D1EFC' }}>{t('CONTACTS')}</h5>
                                <ul className="list-unstyled">
                                    <li>{t('ADDRESS_ZOO')}</li>
                                    <li>zookishinev@mail.ru</li>
                                    <li>(022) 76-37-33</li>
                                </ul>
                            </Col>
                        </Row>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="text-start mb-0">© 2024 Gradina Zoologica. {t('RESERVED')}</h6>
                            <div className="text-end">
                                Developed by <Link to="https://www.cyberfolks.md/" target="_blank"><strong>CyberFolks</strong></Link>
                            </div>
                        </div>
                        <br />
                    </div>
                </Container>
            </div>
            <img src={'/Forest.png'} alt={'Forest background'} style={{ width: '100%', height: 'auto' }} />
        </>
    );
}

export default Footer;
