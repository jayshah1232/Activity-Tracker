import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            user: {}
        }
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = event => {
        event.preventDefault();
        let user = {
            "username": this.state.email,
            "password": this.state.password
        }
        axios.post('http://localhost:8080/users/login', { user })
            .then(res => {
                this.setState({ user: res.data });
                localStorage.setItem("user", JSON.stringify(res.data));
                this.props.handleLogin(res);
                this.setState({ redirect: true });
            })
            .catch(error => console.log("this is the error: ", error))
    }
    render() {
        if (this.state.redirect) {
            let user = this.state.user;
            return <Redirect to={{ pathname: '/dashboard', data: { user } }} />
        }
        return(
            <div className="columns is-centered">
                <div className="column is-two-fifths">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <h1>Login</h1>
                                <form method="post" onSubmit = { this.submitHandler }>
                                    <div className="field">
                                        <label for="email" className="label">Email</label>
                                        <div className="control">
                                            <input className="input" placeholder="email@example.com" type="email" name="email" id="email" onChange={ this.changeHandler }/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label for="password" className="label">Password</label>
                                        <div className="control">
                                            <input className="input" type="password" name="password" id="pwd" onChange={ this.changeHandler }/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-primary" type="submit">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}