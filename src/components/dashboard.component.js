import React, { Component } from 'react';
import axios from "axios";
import ActivityCard from './activitycard.component'
import './styles/dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userActivities: [],
            activityToAdd: {}
        }

        this.getUserActivities = this.getUserActivities.bind(this);
        this.addUserActivities = this.addUserActivities.bind(this);
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
        })
        .catch(e => {
            console.log("No activities");
        })
    }

    addUserActivities(activity) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(activity);
        if ((this.state.userActivities).length === 0) {
            axios.post('http://localhost:8080/users/useractivities', {
                params: {
                    token: user.jwtToken,
                    activity: activity
                }
            })
            .then(res => {
                const activities = res.data;
                this.setState({ userActivities: activities }, () => {
                    console.log(this.state.userActivities);
                });
                console.log(this.state.userActivities);
            })
            .catch(res => {
                console.log("No activities");
            })
        }
        else {
            axios.patch('http://localhost:8080/users/useractivities', {
                params: {
                    token: user.jwtToken,
                    activity: activity
                }
            })
            .then(res => {
                const activities = res.data;
                const joined = this.state.userActivities.concat(activities);
                this.setState({ userActivities: joined }, () => {
                    console.log(this.state.userActivities);
                });
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    changeHandler = event => {
        const act = {
            description: event.target.value,
            totalTime: 0
        };
        this.setState({ activityToAdd: {description: event.target.value, totalTime: 0} });
        this.getUserActivities();
    }

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state.activityToAdd);
        this.addUserActivities(this.state.activityToAdd);
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
        const activities = this.state.userActivities;
        return(
            <div className="columns is-mobile">
                <div className="column is-three-quarters">
                    <div className="box" id="activities">
                        <h1 className="title">
                            Tracker for CURRENT_DATE
                        </h1>
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
                            <div className="box">
                                <h2 className="subtitle">Your Activity List</h2>
                                <div id="button-list">
                                    {
                                        activities.map((object, index) => {
                                            return(
                                                <button className="button" key={`${object.description}`}>{object.description}</button>
                                            )
                                        })
                                    }  
                                </div>
                            </div>
                            <div className="box">
                                <form method="post" onSubmit = { this.submitHandler }>
                                    <div className="field">
                                        <label htmlFor="description" className="label">Description</label>
                                        <div className="control">
                                            <input className="input" type="text" name="description" onChange = { this.changeHandler }/>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <button className="button is-primary" type="submit">Add Activity</button>
                                            </div>
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