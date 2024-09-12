import React from 'react';
import {Button, Nav} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";

function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    // Determine active link
    const getLinkClass = (path) => location.pathname === path ? 'nav-link-active' : '';

    const handleLogout = () => {
        // Remove JWT token from cookies
        Cookies.remove('jwtToken');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <>
        <div className="sidebar p-4 show-desktop">
            <h4>Categories</h4>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/animals" className={getLinkClass('/admin/animals')}>
                        Animals
                    </Nav.Link>
                </Nav.Item>
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
                    <Nav.Link as={Link} to="/admin/news" className={getLinkClass('/admin/news')}>
                        News
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/activities" className={getLinkClass('/admin/activities')}>
                        Activities
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/posts" className={getLinkClass('/admin/posts')}>
                        Posts
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/reviews" className={getLinkClass('/admin/reviews')}>
                        Reviews
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/admin/tenders" className={getLinkClass('/admin/tenders')}>
                        Tenders
                    </Nav.Link>
                </Nav.Item>
            </Nav>
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
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button"
                                           data-bs-toggle="dropdown" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <form className="d-flex mt-3" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </>
    );
}

export default AdminSidebar;
