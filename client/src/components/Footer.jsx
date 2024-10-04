import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";


function Footer() {

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
                            <p>Grădină zoologică mun.Chișinău</p>
                        </Col>

                        {/* Column 2 */}
                        <Col xs={12} md={2} className="mb-4 mb-md-0">
                            <h5 style={{color: '#0A4D1EFC'}}>Навигация</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/questions" >Правила зоопарка</Link></li>
                                <li><Link to="/map" >Как добраться</Link></li>
                                <li><Link to ="/contacts" >Вакансии</Link></li>
                                <li><Link to ="/questions" >Частые вопросы</Link></li>
                            </ul>
                        </Col>

                        {/* Column 3 */}
                        <Col xs={12} md={2} className="mb-4 mb-md-0">
                            <h5 style={{color: '#0A4D1EFC'}}>Ресурсы</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/tender" >Госзакупки</Link></li>
                                <li><Link to="/tender" >Публичная информация</Link></li>
                                <li><Link to="/" >Сайты государственных учереждении</Link></li>

                            </ul>
                        </Col>

                        {/* Column 4 */}
                        <Col xs={12} md={2}>
                            <h5 style={{color: '#0A4D1EFC'}}>Контакты</h5>
                            <ul className="list-unstyled">
                                <li>Кишинёв, бульвар Дачия, 50/7 MD-2072</li>
                                <li>zookishinev@mail.ru</li>
                                <li>(022) 76-37-33</li>
                            </ul>
                        </Col>
                    </Row>
                    <hr/>
                    <h6 className={'text-center'}> © 2024 Gradina Zoologica. Все права защищены </h6>
                    <br/>
                </div>

            </Container>
            <img src={'/Forest.png'} alt={'forest'} className={'img-fluid'}/>
        </div>

    );
}

export default Footer;