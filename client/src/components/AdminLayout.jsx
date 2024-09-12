import React, { useState } from "react";
import { Container, Row, Col, Navbar, Offcanvas, Nav } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

    const isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;

    return (
        <div>
            {/* Admin Navbar */}
            <AdminNavbar />
            {/* Main Layout */}
            <Container fluid>
                <Row>
                    {/* Sidebar for larger screens (hidden on mobile) */}
                        <Col xs={12} md={3} >
                            <AdminSidebar />
                        </Col>
                    {/* Main content area */}
                    <Col xs={12} md={9}>
                        <h2 className="text-center mb-4">Welcome to the Admin Dashboard</h2>
                        <main>
                            <Outlet /> {/* Renders child routes */}
                        </main>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLayout;
