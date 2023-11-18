import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/sandralogo.png';
import './Navbar.css';
import icon from '../assets/usericon.png';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function Navbarr() {

  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate('/login')
  }

  let user = localStorage.getItem('user-name');

  return (
    <Container>

      <Navbar className='Nav ml-4' data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className='sa' href="/user">
           <div className='ml-4'> Sandra{' '}</div>
            <img
              src={Logo}
              alt="Logo"
              height="40"
              width="40"
              className='logoImage ml-2'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto ml-5" >

              {
                localStorage.getItem('user-info') ?
                  <>
                    <Nav.Link href="#chatbot">Talk to Sandra</Nav.Link>
                    <Nav.Link href="/doctor">Doctors</Nav.Link>
                    <Nav.Link href="#articales">Articals</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                    <Nav.Link href='/chats'>Chats</Nav.Link>
                    <Nav.Link href="/user">Home</Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link href='/signup'>Signup</Nav.Link>
                    <Nav.Link href='/signup/doctor'>Signup Doctor</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>

                  </>
              }


              {
                localStorage.getItem('user-info') ?
                  < div className="part ">
                  
                   
                    
                    <Nav.Link >

                      <div className='userInfo flex ml-80'>
                        <img
                          src={icon}
                          alt='user'
                          height={20}
                          width={50} />
                          <NavDropdown title={user} >
                          <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                      </div>
                    </Nav.Link>
                  </div>
                  :
                  null
              }


            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </Container>
  );
}

export default Navbarr;