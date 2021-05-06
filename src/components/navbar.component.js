import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        console.log("logout clicked");
        localStorage.removeItem('user');
    }
    
    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            return (
                <nav className="navbar is-primary">
                    <div className="navbar-brand">
                        Activity Tracker
                    </div>
    
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">
                                Home
                            </Link>
                        </div>
    
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link to="/signup" className="button is-primary">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link to="/login" className="button is-light">
                                        Log in
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )
        }
        return (
            <nav className="navbar is-primary">
                <div className="navbar-brand">
                    Activity Tracker
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/" className="button is-light" onClick={this.logout}>
                                    Log out
                                </Link>
                                {/* <Link to="/signup" className="button is-primary">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

}