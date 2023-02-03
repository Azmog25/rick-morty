import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {
    auth,
    logout,
} from "../database/DBHandler";
import {useEffect, useState} from "react";

function NavigationBar() {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setConnected(!!user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky={"top"}>
            <Container>
                <Navbar.Brand href="">Rick & Morty</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Accueil</Nav.Link>
                        <Nav.Link href="/Episodes/1">Episodes</Nav.Link>
                        <NavDropdown title={"Favoris"} id="basic-nav-dropdown" menuVariant="dark">
                            <NavDropdown.Item href={"/EpisodesFav"}>Episodes</NavDropdown.Item>
                            <NavDropdown.Item href={"/PersonnagesFav"}>Personnages</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
                        {connected ? (
                            <Nav.Link href={"/"} onClick={logout}>Déconnexion</Nav.Link>
                        ) : (
                            <Nav.Link href="/">Connexion/Inscription</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;