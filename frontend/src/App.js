import React from "react";
import logo from "./images/logo.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";

import CreateGroup from "./Creategroup";
import EditGroup from "./Editgroup";

import CreateRol from "./Createrol";
import EditRol from "./Editrol";

import Profesor from "./class_profesor.js";
import Estudiante from "./class_estudiante.js";
import FabLab from "./class_FabLab.js";


import User from "./User.js";

import { useDispatch } from "react-redux";
import { logout } from "./redux/actions/authActions.js";
import { Navbar, Nav,DropdownButton,Dropdown } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";

function App() {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const user = User();
  console.log()
  const userType = user ? user.role : undefined;

  switch (userType) {
    case "estudiante":
      return (
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                src={logo}
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/dev">
                  Modules
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} onClick={handleLogout} to="/home">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Estudiante />
            </Route>
          </Switch>
        </div>
      );
    case "Client":
      return (
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                src={logo}
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/projects">
                  Projects
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} onClick={handleLogout} to="/home">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      );
    case "fablab":
      return (
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                src={logo}
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/EditGroup">
                EditGroup
                </Nav.Link>
                <Nav.Link as={Link} to="/EditRol">
                EditRol
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <DropdownButton id="dropdown-basic-button" title="Grupo" variant={'secondary'} navbar = 'true'>
                  <Dropdown.Item as={Link} to="/CreateGroup">Crear</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/EditGroup">Editar</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Roles" variant={'secondary'} navbar = 'true'>
                  <Dropdown.Item as={Link} to="/CreateRole">Crear</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/EditRole">Editar</Dropdown.Item>
                </DropdownButton>
                <Nav.Link as={Link} onClick={handleLogout} to="/home">
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/CreateGroup">
              <CreateGroup />
            </Route>
            <Route path="/EditGroup">
              <EditGroup />
            </Route>
            <Route path="/CreateRole">
              <CreateRol />
            </Route>
            <Route path="/EditRole">
              <EditRol />
            </Route>
            <Route path="/">
              <FabLab />
            </Route>
          </Switch>
        </div>
      );
    default:
      return (
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
              <img
                src={logo}
                width="70"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/register">
                  Registro
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>

            
          </Switch>
        </div>
      );
  }
}

export default App;
