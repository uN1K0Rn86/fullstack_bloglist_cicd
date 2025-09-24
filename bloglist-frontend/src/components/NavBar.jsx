import { Link } from "react-router-dom"
import User from "./User"
import { Navbar, Nav } from "react-bootstrap"
import { useSelector } from "react-redux"

const NavBar = () => {
  const padding = { padding: "10px" }
  const user = useSelector(state => state.user)

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      style={{ borderRadius: "8px", marginBottom: "10px" }}
    >
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users'>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            {user ? <User /> : null}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
