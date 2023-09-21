import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const MyNavBar = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const [url, setUrl] = useState(null);

    const isActivePath = (currentPath, path) => currentPath === path ? "active" : "";

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">FantastiCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" defaultActiveKey="/">
                        <Nav.Link as={Link} to="/" className={isActivePath(url, '/')}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard" className={isActivePath(url, '/dashboard')}>
                            {t('dashboard.title')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/control" className={isActivePath(url, '/control')}>
                            {t('control.title')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/account" className={isActivePath(url, '/account')}>
                            {t('profile.title')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/logout" className={isActivePath(url, '/')}>
                            {t('logout')}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavBar;