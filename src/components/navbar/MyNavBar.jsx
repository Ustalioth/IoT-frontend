import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from "features/authSlice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthService from "services/auth.service";


const MyNavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    
    const [url, setUrl] = useState(null);

    const isActivePath = (currentPath, path) => currentPath === path ? "active" : "";

    const handleLogout = () => {
        dispatch(logout());
        AuthService.logout();
        navigate(`/signin`, { replace: true });
    }

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>FantastiCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" defaultActiveKey="/">
                        <NavDropdown title="Lang" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => i18n.changeLanguage('en')}>EN</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => i18n.changeLanguage('fr')}>FR</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/" className={isActivePath(url, '/')}>
                            {t('home.title')}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/account" className={isActivePath(url, '/account')}>
                            {t('profile.title')}
                        </Nav.Link>
                        <Nav.Link onClick={ handleLogout }>
                            {t('logout')}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavBar;