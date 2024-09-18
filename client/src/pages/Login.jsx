import {useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isAuth, setIsAuth] = useState(false);

    console.log('isAuth', isAuth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
                email,
                password
            });

            console.log('response', response, response.data.token);

            if (response.status === 200) {
                // Save JWT token in cookies
                Cookies.set('jwtToken', response.data.token, { expires: 1 }); // Token expires in 1 day
                const decodedToken = jwtDecode(response.data.token);

                // Check if the role is ADMIN
                if (decodedToken.role === 'ADMIN') {
                    setIsAuth(true);
                    console.log('User is authenticated as ADMIN');
                } else {
                    setError('You do not have the necessary permissions.');
                }
                console.log('Token saved:', response.data.token);
                // Redirect or perform any other action after successful login
            } else {
                setError('Login failed. No token received.');
                console.log('Token saved:', response.data.token);
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    if (isAuth) {
        return <Navigate to="/admin" />;
    }

    return (
        <>
            <img src={'banner.svg'} className={'img-fluid'} alt={'banner'}/>
            <Container style={{marginTop: "40px"}}>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <br/>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Login;
