import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={Link} href="/">TV Series App</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} href="/populares">Populares</Nav.Link>
      <Nav.Link as={Link} href="/melhores-avaliadas">Melhores Avaliadas</Nav.Link>
      <Nav.Link as={Link} href="/tv-hoje">Na TV Hoje</Nav.Link>
      <Nav.Link as={Link} href="/series-no-ar">Séries no Ar</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
