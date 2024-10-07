import {Accordion, Nav} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active link
    const getLinkClass = (path) => location.pathname === path ? 'nav-link-active' : '';

    const handleLogout = () => {
        Cookies.remove('jwtToken');
        // Redirect to login page
        navigate('/login');
    };

    const renderNavLinks = () => (
        <Nav className="flex-column">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/main_page/1" className={getLinkClass('/admin/main_page')}>
                    Main Page
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/events" className={getLinkClass('/admin/events')}>
                    Events
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/reviews" className={getLinkClass('/admin/reviews')}>
                    Reviews
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/faq" className={getLinkClass('/admin/faq')}>
                    FAQ
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/week_hours" className={getLinkClass('/admin/week_hours')}>
                    Week Hours
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className={"mt-4"}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >
                            News Posts
                        </Accordion.Header>
                        <Accordion.Collapse eventKey="0" >
                            <Accordion.Body >
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/posts" className={getLinkClass('/admin/posts')}>
                                        News List
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/tags"
                                              className={getLinkClass('/admin/tags')}>
                                        News Tags
                                    </Nav.Link>
                                </Nav.Item>
                            </Accordion.Body>
                        </Accordion.Collapse>
                    </Accordion.Item>
                </Accordion>
            </Nav.Item>
            <Nav.Item className={"mt-4"}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >
                            Animals
                        </Accordion.Header>
                        <Accordion.Collapse eventKey="0" >
                            <Accordion.Body >
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/animals" className={getLinkClass('/admin/animals')}>
                                        Animals
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/type_animals"
                                              className={getLinkClass('/admin/type_animals')}>
                                        Type Animals
                                    </Nav.Link>
                                </Nav.Item>
                            </Accordion.Body>
                        </Accordion.Collapse>
                    </Accordion.Item>
                </Accordion>
            </Nav.Item>
            <Nav.Item className={"mt-4"}>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >
                            Tenders
                        </Accordion.Header>
                        <Accordion.Collapse eventKey="0" >
                            <Accordion.Body >
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/tenders" className={getLinkClass('/admin/tenders')}>
                                        Tenders
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/type_tenders"
                                              className={getLinkClass('/admin/type_tenders')}>
                                        Type Tenders
                                    </Nav.Link>
                                </Nav.Item>
                            </Accordion.Body>
                        </Accordion.Collapse>
                    </Accordion.Item>
                </Accordion>
            </Nav.Item>
        </Nav>
    )

    return (
        <>
        <div className="sidebar p-4 show-desktop">
            <h4>Categories</h4>
            {renderNavLinks()}
        </div>
            <br/>
            <div className={'show_mobile'}>
                <nav className="navbar bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Zoo </a>
                        <a onClick={handleLogout}>
                            Logout
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                             aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                {renderNavLinks()}
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

export default AdminSidebar;
