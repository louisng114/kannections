import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BNavbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const logoutHandle = () => {
        logout();
        navigate("/");
    }

    return (
        <BNavbar fixed="top" bg="light" expand="lg" className="bg-body-tertiary">
            <Container className="d-flex justify-content-between">
                <BNavbar.Brand as={Link} to="/"><ruby>漢<rt>KAN</rt></ruby>nections</BNavbar.Brand>
                <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto d-flex align-items-center">
                        {/* dropdown menu for starting game */}
                        <NavDropdown title="Game">
                            <NavDropdown.Item href="/game5">JLPT 5</NavDropdown.Item>
                            <NavDropdown.Item href="/game4">JLPT 4</NavDropdown.Item>
                            <NavDropdown.Item href="/game3">JLPT 3</NavDropdown.Item>
                            <NavDropdown.Item href="/game2">JLPT 2</NavDropdown.Item>
                            <NavDropdown.Item href="/game1">JLPT 1</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/ApiInfo">About the API</Nav.Link>
                    </Nav>
                    <Nav className="d-flex align-items-center">
                        {!user ? (
                            <>
                                <Button variant="outline-info m-2" as={Link} to="/login">Log In</Button>
                                <Button variant="outline-success m-2" as={Link} to="/signup">Sign Up</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Button variant="outline-danger m-2" onClick={logoutHandle}>Log Out</Button>
                            </>
                        )}
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
}

export default Navbar;
