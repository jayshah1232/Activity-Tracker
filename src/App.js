import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import Home from "./components/home.component.js";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
  }

  debugger;

  checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && this.state.loggedInStatus === "NOT_LOGGED_IN") {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: user.user
      })
    } else {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.data
    })
  }

  handleSuccessfulAuth(data) {
    this.props.push("/");
  }
  
  componentDidMount() {
    this.checkLoginStatus();
  }
  
  render() {
    return (
      <Router>
        <Navbar loggedInStatus={this.state.loggedInStatus}/>
        <br />
        <Route 
          path="/" 
          exact 
          render={props => (
            <Home {...props} loggedInStatus={this.state.loggedInStatus} />
          )} />
        <Route 
          path="/login" 
          exact
          render={props => (
            <Login {...props} handleLogin={this.handleLogin} />
          )} />
        {/* <Route path="/edit/:id" exact component={ActivitiesList} />
        <Route path="/addactivity" exact component={ActivitiesList} />*/}
        <Route 
          path="/signup" 
          exact
          render={props => (
            <Signup {...props} handleLogin={this.handleLogin} />
          )} />
          <Route path="/dashboard" exact component={Dashboard} />
      </Router>
    );
  }
}
