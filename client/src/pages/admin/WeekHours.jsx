import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { createWeekHours, deleteWeekHours, fetchWeekHours, updateWeekHours } from "../../utils/apiCalls.js";

function WeekHours() {
    const [weekHours, setWeekHours] = useState([]);
    const [newHour, setNewHour] = useState({
        dayOfWeek: "",
        openTime: "",
        closeTime: "",
    });
    const [editHour, setEditHour] = useState(null); // To hold the hour being edited

    const validWeekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Fetch all week hours
    const getWeekHours = async () => {
        try {
            const data = await fetchWeekHours();
            setWeekHours(data);
        } catch (err) {
            console.error("Error fetching week hours:", err);
        }
    };

    useEffect(() => {
        getWeekHours();
    }, []);

    // Handle input changes for create form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHour({ ...newHour, [name]: value });
    };

    // Handle input changes for edit form
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditHour({ ...editHour, [name]: value });
    };

    // Validate if day is a valid weekday
    const isValidWeekday = (day) => validWeekdays.includes(day);

    // Create week hour
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!isValidWeekday(newHour.dayOfWeek)) {
            alert("Please enter a valid day of the week (e.g., Monday).");
            return;
        }
        try {
            await createWeekHours(newHour);
            setNewHour({ dayOfWeek: "", openTime: "", closeTime: "" }); // Clear form
            getWeekHours(); // Refresh the list
        } catch (err) {
            console.error("Error creating week hour:", err);
        }
    };

    // Update week hour
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!isValidWeekday(editHour.dayOfWeek)) {
            alert("Please enter a valid day of the week (e.g., Monday).");
            return;
        }
        try {
            await updateWeekHours(editHour.id, editHour);
            setEditHour(null); // Exit edit mode
            getWeekHours(); // Refresh the list
        } catch (err) {
            console.error("Error updating week hour:", err);
        }
    };

    // Delete week hour
    const handleDelete = async (id) => {
        try {
            await deleteWeekHours(id);
            getWeekHours(); // Refresh the list
        } catch (err) {
            console.error("Error deleting week hour:", err);
        }
    };

    return (
        <>
            <h4>Manage Week Hours</h4>
            <br />
            <br />
            {/* Create Form */}
            <h5>Create Week Hour/ Orarul de lucru</h5>
            <Form onSubmit={handleCreate}>
                <Form.Label className={'mb-5'}>Day of the Week (e.g., Monday/Luni, Tuesday/Marti, Wednesday/Miercuri, Thursday/Joi, Friday/Vineri, Saturday/Simbata, Sunday/Duminica)</Form.Label>
                <br/>
                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="dayOfWeek">
                            <Form.Label>Day</Form.Label>
                            <Form.Control
                                type="text"
                                name="dayOfWeek"
                                placeholder="Enter Day"
                                value={newHour.dayOfWeek}
                                list="weekdays"
                                onChange={handleInputChange}
                            />
                            <datalist id="weekdays">
                                {validWeekdays.map((day, index) => (
                                    <option key={index} value={day} />
                                ))}
                            </datalist>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="openTime">
                            <Form.Label>Open Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="openTime"
                                value={newHour.openTime}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="closeTime">
                            <Form.Label>Close Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="closeTime"
                                value={newHour.closeTime}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Create Hour
                </Button>
            </Form>
            <br />
            <br />
            <br />

            {/* Week Hours List */}
            <h5>Week Hours List</h5>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Day</th>
                    <th>Open Time</th>
                    <th>Close Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {weekHours.map((hour) => (
                    <tr key={hour.id}>
                        <td>{hour.dayOfWeek}</td>
                        <td>{hour.openTime}</td>
                        <td>{hour.closeTime}</td>
                        <td>
                            <Button
                                variant="warning"
                                onClick={() => setEditHour(hour)}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(hour.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Edit Form (visible when an hour is being edited) */}
            {editHour && (
                <>
                    <h5>Edit Hour</h5>
                    <Form onSubmit={handleUpdate}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="dayOfWeek">
                                    <Form.Label>Day</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dayOfWeek"
                                        placeholder="Enter Day"
                                        value={editHour.dayOfWeek}
                                        list="weekdays"
                                        onChange={handleEditInputChange}
                                    />
                                    <datalist id="weekdays">
                                        {validWeekdays.map((day, index) => (
                                            <option key={index} value={day} />
                                        ))}
                                    </datalist>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="openTime">
                                    <Form.Label>Open Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="openTime"
                                        value={editHour.openTime}
                                        onChange={handleEditInputChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="closeTime">
                                    <Form.Label>Close Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="closeTime"
                                        value={editHour.closeTime}
                                        onChange={handleEditInputChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Update Hour
                        </Button>
                        <Button
                            variant="secondary"
                            className="ms-2"
                            onClick={() => setEditHour(null)}
                        >
                            Cancel
                        </Button>
                    </Form>
                </>
            )}
        </>
    );
}

export default WeekHours;
