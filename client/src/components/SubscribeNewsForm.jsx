import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {createEmailSubscribe} from "../utils/apiCalls.js";
import {useTranslation} from "../providers/index.js"; // Ensure you're using react-bootstrap or adjust accordingly


const SubscribeNewsForm = () => {
    const { t } = useTranslation();
    const [emailUser, setEmailUser] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const data = await createEmailSubscribe({ email: emailUser }); // Call the createEmailSubscribe function
            setResponseMessage(data.message || t('EMAIL_SENT_SUCCESS')); // Set the response message
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage(t('EMAIL_SEND_FAILED')); // Error message from translations
        }
    };

    return (
        <Row className={'bg_green p-3 mt-5'}>
            <Col xs={12} md={6}>
                <h1 className={'color_white'}>{t('SUBSCRIBE_NEWS')}</h1>
            </Col>
            <Col xs={12} md={6}>
                <Form onSubmit={handleSubmit}>
                    <Row className={'color_white mt-4'}>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="email">
                                <Form.Control
                                    type="email"
                                    value={emailUser}
                                    onChange={(e) => setEmailUser(e.target.value)} // Update state with the email input
                                    placeholder={t('ENTER_EMAIL')} // Placeholder from translations
                                    required // Make sure the input is required
                                />
                            </Form.Group>
                            {responseMessage && <p>{responseMessage}</p>}
                        </Col>
                        <Col xs={12} md={6} className={'mt-2'}>
                            <Button variant={'outline-warning'} type="submit">
                                {t('SUBSCRIBE')}
                            </Button>
                        </Col>
                        <div className={'mt-2'} style={{ fontSize: '12px' }}>
                            {t('ADDITIONAL_TEXT_1')}&nbsp;{t('ADDITIONAL_TEXT_2')}
                        </div>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export default SubscribeNewsForm;
