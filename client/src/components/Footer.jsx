import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useTranslation} from "../providers/index.js";


function Footer() {
    const {t} = useTranslation();

    return (

        <div style={{ paddingTop: '40px', textAlign: 'center'}}>
            <br/>
            <Container>
                <br/>
                <div style={{paddingTop: '80px'}}>
                    <Row>
                        {/* Column 1 */}
                        <Col xs={12} md={6} className="mb-4 mb-md-0 text-start">
                            <Link to={'/'} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <img src={'/logo_svg.svg'} alt="Events logo" className={'img-fluid'} style={{ marginRight: '10px' }} />
                                <span style={{ color: '#0A4D1E', fontWeight: '600', fontSize: '18px' }}>ZOO Chisinau</span>
                            </Link>
                            <br/>
                            <br/>
                            <p>Grădină Zoologică mun.Chișinău</p>
                        </Col>

                        {/* Column 2 */}
                        <Col xs={12} md={2} className="mb-4 mb-md-0">
                            <h5 style={{color: '#0A4D1EFC'}}>{t('NAVIGATION')}</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/questions" >{t('RULES_ZOO')}</Link></li>
                                <li><Link to="/map" >{t('DIRECTION')}</Link></li>
                                <li><Link to ="/contacts" >{t('VACANCY')}</Link></li>
                                <li><Link to ="/questions" >{t('FAQ')}</Link></li>
                            </ul>
                        </Col>

                        {/* Column 3 */}
                        <Col xs={12} md={2} className="mb-4 mb-md-0">
                            <h5 style={{color: '#0A4D1EFC'}}>{t('RESOURCES')}</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/tender" >{t('GOS_BUY')}</Link></li>
                                <li><Link to="/tender" >{t('PUB_INFO')}</Link></li>
                                <li><Link to="/" >{t('SITES_GOUVERMENT')}</Link></li>

                            </ul>
                        </Col>

                        {/* Column 4 */}
                        <Col xs={12} md={2}>
                            <h5 style={{color: '#0A4D1EFC'}}>{t('CONTACTS')}</h5>
                            <ul className="list-unstyled">
                                <li>{t('ADDRESS_ZOO')}</li>
                                <li>zookishinev@mail.ru</li>
                                <li>(022) 76-37-33</li>
                            </ul>
                        </Col>
                    </Row>
                    <hr/>
                    <h6 className={'text-center'}> © 2024 Gradina Zoologica. {t('Все права защищены')} </h6>
                    <br/>
                </div>

            </Container>
            <img src={'/Forest.png'} alt={'forest'} className={'img-fluid'}/>
        </div>

    );
}

export default Footer;