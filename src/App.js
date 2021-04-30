
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import Home from "./components/home.component.js";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
// import Navbar from "./components/navbar.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      {/* <Route path="/edit/:id" exact component={ActivitiesList} />
      <Route path="/addactivity" exact component={ActivitiesList} />*/}
      <Route path="/signup" exact component={Signup} /> 
    </Router>
  );
}

export default App;
