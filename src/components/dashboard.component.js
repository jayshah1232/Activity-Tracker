import React, { Component } from 'react';
import axios from "axios";
import ActivityCard from './activitycard.component'
import './styles/dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userActivities: []
        }

        this.getUserActivities = this.getUserActivities.bind(this);
    }

    getUserActivities() {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:8080/users/useractivities', {
            params: {
                token: user.jwtToken
            }
        })
        .then(res => {
            const activities = res.data;
            this.setState({ userActivities: activities });
            console.log(this.state.userActivities);
        })
        .catch(e => {
            console.log("No activities");
        })
    }

    addUserActivities() {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post('http://localhost:8080/users/useractivities', {
            params: {
                token: user.jwtToken
            }
        })
        .then(res => {
            const activities = res.data;
            this.setState({ userActivities: activities });
            console.log(this.state.userActivities);
        })
        .catch(e => {
            console.log("No activities");
        })
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:8080/users/user', {
            params: {
                token: user.jwtToken
            }
        })
        .then(res => {
            this.setState({ user: res.data });
        })
        .catch(e => {
            console.log(e);
        });
        this.getUserActivities();
    }

    render() {
        return(
            <div className="columns is-mobile">
                <div className="column is-three-quarters">
                    <div className="card" id="activities">
                        <header className="card-header">
                            Tracker for CURRENT_DATE
                        </header>
                        <div className="card-conent">
                            <ActivityCard name={"Activity Test 1"} goalTime={2} currentTime={0}/>
                        </div>
                    </div>
                </div>
                <div className="column is-quarter">
                    <div className="card" id="menu">
                        <header className="card-header">
                            Menu
                        </header>
                        <div className="card-content">
                            <button className="button is-light" onClick={this.getUserActivities}>Get Activities</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}