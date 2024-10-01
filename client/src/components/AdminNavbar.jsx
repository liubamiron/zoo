
import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AdminNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove JWT token from cookies
        Cookies.remove('jwtToken');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Nav >
                    <Navbar.Brand href="/" className="mx-auto">Zoo Page</Navbar.Brand>
                </Nav>
                <Nav className="ms-auto">
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;
