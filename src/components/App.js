import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Navbar, Nav} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import CreateTodo from "./create";
import EditTodo from "./todo";
import TodosList from "./list";
import Home from "./home"
import Register from "./register";
import Login from "./login";

import Footer from "./Footer"


class App extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="dark" style={{backgroundColor: "282c34"}} expand="sm">
            <Navbar.Brand href="/" style={{color: "white"}}>Restaurant Passport</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{color: "white"}}>
              <Nav className="mr-auto">
                <Nav.Link href="/" className="nav-link" style={{color: "white"}}>View List</Nav.Link>
                <Nav.Link href="/create" className="nav-link" style={{color: "white"}}>Add Entry</Nav.Link>
              </Nav>

            </Navbar.Collapse>
          </Navbar>
          <br/>
        <div className="container">
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>

        <Footer />
      </Router>
    );
  }
}

export default App;