import React, { Component } from 'react';
import axios from "axios";
import ActivityCard from './activitycard.component'
import ActivityButton from './activitybutton.component'
import ActivitiesList from './activitieslist.component'
import './styles/dashboard.css'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userActivities: [],
            todaysActivities: [],
            activityToAdd: {},
            isLoading: false
        }

        this.getTodaysActivities = this.getTodaysActivities.bind(this);
        this.getUserActivities = this.getUserActivities.bind(this);
        this.addUserActivities = this.addUserActivities.bind(this);
    }

    getTodaysActivities() {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get('http://localhost:8080/activities/list', {
            params: {
                token: user.jwtToken
            }
        })
        .then(res => {
            this.setState({ todaysActivities: res.data });
            console.log(this.state.todaysActivities);
        })
        .catch(error => {console.log(error);})
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
        this.setState({ isLoading: true });
        if ((this.state.userActivities).length === 0) {
            axios.post('http://localhost:8080/users/useractivities', {
                params: {
                    token: user.jwtToken,
                    activity: activity
                }
            })
            .then(res => {
                const activities = activity;
                this.setState(prevState => {
                    return {
                        userActivities: [...prevState.userActivities, activities],
                        isLoading: false,
                    }
                })
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
                const activities = activity;
                const joined = this.state.userActivities.concat(activities);
                this.setState(prevState => {
                    return {
                        userActivities: joined,
                        isLoading: false,
                    }
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
    }

    submitHandler = event => {
        event.preventDefault();
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
        this.getTodaysActivities();
    }

    render() {
        const { todaysActivities, userActivities, isLoading } = this.state;
        return(
            <div className="columns is-mobile">
                <div className="column is-three-quarters">
                    <div className="box" id="activities">
                        <h1 className="title">
                            Tracker for CURRENT_DATE
                        </h1>
                        <div className="card-conent">
                            {todaysActivities.map((object, index) => 
                                (
                                    <ActivityCard name={object.description} goalTime={object.goalTime} currentTime={object.duration}/>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <div className="column is-quarter">
                    <div className="card" id="menu">
                        <header className="card-header">
                            Menu
                        </header>
                        <div className="card-content">
                            <button className="button is-light" onClick={this.getTodaysActivities}>Get Activities</button>
                            <div className="box">
                                <h2 className="subtitle">Your Activity List</h2>
                                <div id="button-list">
                                    <ActivitiesList activities={userActivities} isLoading={isLoading} getNewActivity={this.getTodaysActivities}/>
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