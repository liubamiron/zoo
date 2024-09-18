import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import {createFAQData, deleteFAQ, getAllFAQ, updateFAQData} from "../../utils/apiCalls.js";

const FAQ = () => {
    const [faq, setFaq] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFaq, setCurrentFaq] = useState(null);
    const [formData, setFormData] = useState({
        question_ru: '', question_ro: '', question_en: '',
        answer_ru: '', answer_ro: '', answer_en: ''
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getAllFAQ();
                setFaq(data);
            } catch (error) {
                console.error('Error fetching faq data:', error);
            }
        };

        getData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFAQ(id);
            setFaq((prevData) => prevData.filter(item => item.id !== id));
            console.log('FAQ deleted successfully');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    const handleCreateOrUpdate = async (event) => {
        event.preventDefault();
        try {
            if (isEditing) {
                await updateFAQData(currentFaq.id, formData);
                setFaq((prevData) => prevData.map(item => item.id === currentFaq.id ? { ...item, ...formData } : item));
            } else {
                await createFAQData(formData);
                setFaq((prevData) => [...prevData, { ...formData, id: Date.now() }]);
            }
            setShowModal(false);
            setFormData({ question_ru: '', question_ro: '', question_en: '',
                answer_ru: '', answer_ro: '', answer_en: '' });
        } catch (error) {
            console.error('Error saving faq:', error);
        }
    };

    const handleEdit = (faq) => {
        setCurrentFaq(faq);
        setFormData({question_ru: faq.question_ru, question_ro: faq.question_ro, question_en: faq.question_en,
            answer_ru: faq.answer_ru, answer_ro: faq.answer_ro, answer_en: faq.answer_en
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleCreate = () => {
        setCurrentFaq(null);
        setFormData({question_ru: '', question_ro: '', question_en: '',
            answer_ru: '', answer_ro: '', answer_en: ''});
        setIsEditing(false);
        setShowModal(true);
    };

    return (
        <Container>
            <div className={'d-flex justify-content-between mt-4'}>
                <h2>Questions & Answers List</h2>
                <Button variant={'outline-success'} onClick={handleCreate}>
                    Create New Question and Answer
                </Button>
            </div>
            {/*<div className="mt-4"*/}
            {/*     style={{ background: 'lightcyan', padding: '15px', borderRadius: '8px' }}>*/}
            {/*    <Row className="align-items-center" style={{ color: 'gray', fontWeight: 'bold' }}>*/}
            {/*        <Col>Questions RO</Col>*/}
            {/*        <Col>Questions RU</Col>*/}
            {/*        <Col>Questions EN</Col>*/}
            {/*        <Col>&nbsp;</Col>*/}
            {/*    </Row>*/}
            {/*    {faq.map((item) => (*/}
            {/*        <div*/}
            {/*            key={item.id}*/}
            {/*            style={{*/}
            {/*                border: '1px solid white',*/}
            {/*                borderRadius: '8px',*/}
            {/*                padding: '10px',*/}
            {/*                marginBottom: '10px'*/}
            {/*            }}>*/}
            {/*            <Row className="align-items-center">*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer', fontWeight: 'bold' }}>*/}
            {/*                        {item.question_ru}*/}
            {/*                        <img*/}
            {/*                            src={'/icons/pencil.svg'}*/}
            {/*                            alt="Edit"*/}
            {/*                            style={{ width: '20px', marginLeft: '10px', cursor: 'pointer' }}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer', fontWeight: 'bold' }}>*/}
            {/*                        {item.question_ro}*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer', fontWeight: 'bold' }}>*/}
            {/*                        {item.question_en}*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col className="text-end">*/}
            {/*                    <Button*/}
            {/*                        variant={'outline-danger'}*/}
            {/*                        onClick={() => handleDelete(item.id)}*/}
            {/*                        style={{ borderRadius: '50%', padding: '5px' }}>*/}
            {/*                        <img src={'/icons/trash.svg'} alt="Delete" style={{ width: '20px' }} />*/}
            {/*                    </Button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*    {faq.map((item) => (*/}
            {/*        <div*/}
            {/*            key={item.id}*/}
            {/*            style={{*/}
            {/*                border: '1px solid white',*/}
            {/*                borderRadius: '8px',*/}
            {/*                padding: '10px',*/}
            {/*                marginBottom: '10px'*/}
            {/*            }}>*/}
            {/*            <Row className="align-items-center">*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer' }}>*/}
            {/*                        {item.answer_ru}*/}
            {/*                        <img*/}
            {/*                            src={'/icons/pencil.svg'}*/}
            {/*                            alt="Edit"*/}
            {/*                            style={{ width: '20px', marginLeft: '10px', cursor: 'pointer' }}*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer' }}>*/}
            {/*                        {item.answer_ro}*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col>*/}
            {/*                    <div*/}
            {/*                        className="me-2"*/}
            {/*                        onClick={() => handleEdit(item)}*/}
            {/*                        style={{ cursor: 'pointer'}}>*/}
            {/*                        {item.answer_en}*/}
            {/*                    </div>*/}
            {/*                </Col>*/}
            {/*                <Col className="text-end">*/}
            {/*                    <Button*/}
            {/*                        variant={'outline-danger'}*/}
            {/*                        onClick={() => handleDelete(item.id)}*/}
            {/*                        style={{ borderRadius: '50%', padding: '5px' }}>*/}
            {/*                        <img src={'/icons/trash.svg'} alt="Delete" style={{ width: '20px' }} />*/}
            {/*                    </Button>*/}
            {/*                </Col>*/}
            {/*            </Row>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}


            <div className="mt-4">
                {faq.map((item) => (
                    <div key={item.id}>
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                <strong>Question (RU):</strong> {item.question_ru}
                            </Col>
                            <Col xs={12} md={6}>
                                <strong>Answer (RU):</strong> {item.answer_ru}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                <strong>Question (RO):</strong> {item.question_ro}
                            </Col>
                            <Col xs={12} md={6}>
                                <strong>Answer (RO):</strong> {item.answer_ro}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                <strong>Question (EN):</strong> {item.question_en}
                            </Col>
                            <Col xs={12} md={6}>
                                <strong>Answer (EN):</strong> {item.answer_en}
                            </Col>
                        </Row>
                        <Row className="mb-4 text-end">
                            <Col>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => handleEdit(item)}
                                    className="me-2">
                                    Edit
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => handleDelete(item.id)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Edit FAQ' : 'Create New FAQ'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateOrUpdate}>
                        <Form.Group controlId="question_ro" className="mb-3">
                            <Form.Label>Question RO</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.question_ro}
                                onChange={(e) => setFormData({...formData, question_ro: e.target.value})}
                                placeholder="Enter question RO"
                            />
                        </Form.Group>
                        <Form.Group controlId="answer_ro" className="mb-3">
                            <Form.Label>Answer RO</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.answer_ro}
                                onChange={(e) => setFormData({...formData, answer_ro: e.target.value})}
                                placeholder="Enter answer RO"
                            />
                        </Form.Group>
                        <Form.Group controlId="question_ru" className="mb-3">
                            <Form.Label>Question RU</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.question_ru}
                                onChange={(e) => setFormData({...formData, question_ru: e.target.value})}
                                placeholder="Enter question RU"
                            />
                        </Form.Group>
                        <Form.Group controlId="answer_ru" className="mb-3">
                            <Form.Label>Answer RU</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.answer_ru}
                                onChange={(e) => setFormData({...formData, answer_ru: e.target.value})}
                                placeholder="Enter question RU"
                            />
                        </Form.Group>
                        <Form.Group controlId="question_en" className="mb-3">
                            <Form.Label>question EN</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.question_en}
                                onChange={(e) => setFormData({...formData, question_en: e.target.value})}
                                placeholder="Enter question EN"
                            />
                        </Form.Group>
                        <Form.Group controlId="answer_en" className="mb-3">
                            <Form.Label>answer EN</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={formData.answer_en}
                                onChange={(e) => setFormData({...formData, answer_en: e.target.value})}
                                placeholder="Enter answer EN"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Update FAQ' : 'Create FAQ'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default FAQ;
