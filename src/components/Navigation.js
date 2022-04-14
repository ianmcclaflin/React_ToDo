import React from 'react'
//We installed react-bootstrap so we could call to components
//from the reract-bootstrap package that will render
//Bootstrap enabled HTML just by the call to one of their components.
//Follow the steps below to implement:
//1. npm install react-bootstrap
//2. Import the components we want to use from that package
//3. Call to the component desired and pass in props to 
//customize
import { Nav, Navbar } from 'react-bootstrap'
//Below we import the Link Component from a package called react-router-dom that connects the routing
//functionality in our app to the navigation we write. It's just a specialized Link!
//To install react-router-dom (Routing functionality), npm install react-router-dom
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

//MINILAB - import and render this component in place of the
//heading that says 'This should be empty' in App.js
export default function Navigation() {
  const { currentUser, login, logout } = useAuth()

  return (
    <Navbar variant="dark" bg="dark" expand="md" className="p-3">
        <Navbar.Brand href="/">ToDoApp Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
                {/* <Link to="/bootstrap" className="nav-link">Bootstrap</Link>
                <Link to="/routing" className="nav-link">Routing</Link> */}
               {currentUser &&
                  <>
                    <Link to="/Categories" className="nav-link">Categories</Link>
                    <Link to="/Todos" className="nav-link">Todos</Link>
                  </>
                }
                
                

                {currentUser ?
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link> :
                  <Nav.Link onClick={() => login()}>Login</Nav.Link>
                }
                
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
