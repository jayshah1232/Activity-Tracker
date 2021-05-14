import React, { Component } from 'react';
import axios from 'axios';
import ActivityButton from './activitybutton.component';

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            isLoading: true,
            modal: false,
            selectedActivity: null,
            modalHours: 0,
            modalMins: 0
        }

        this.addActivity = this.addActivity.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit() {
        const user = JSON.parse(localStorage.getItem('user'));
        const {modalHours, modalMins, selectedActivity} = this.state;
        let today = new Date();
        today.setUTCHours(0,0,0,0);
        const goalTime = parseFloat(modalHours) + (parseFloat(modalMins)/60);
        axios.post('http://localhost:8080/activities/addactivity', {
            params: {
                token: user.jwtToken,
                description: selectedActivity,
                duration: 0,
                goalTime: goalTime,
                date: today
            }
        })
        .then(res => {
            this.callParentGetActivities();
            console.log(res);
        })
        .catch(e => console.log(e));
    }

    callParentGetActivities() {
        this.props.getNewActivity();
    }

    componentDidMount() {
        this.setState(prevState => {
            return {
                activities: [...prevState.activities, this.props.activities],
                isLoading: this.props.isLoading,
            }
        })
    }

    addActivity(activitySelected) {
        console.log("activity added");
        this.setState({ modal: !this.state.modal, selectedActivity: activitySelected });
    };

    render() {
        let hours = [];
        let mins = [];
        for(let i = 0; i <= 24; i++) {
            hours.push(i);
        }
        for(let i = 0; i <= 59; i++) {
            mins.push(i);
        }
        const active = this.state.modal ? "is-active" : "";
        if(this.state.isLoading) {
            console.log("loading");
            return (
                <div>
                    <progress className="progress is-small is-primary" max="100">15%</progress>
                </div>
            )
        } else {
            console.log('loading done');
            const activitiesList = this.props.activities;
            return(
                <div>
                    <div>
                        {activitiesList.map((object, index) => 
                            (
                                <div className="ActivityButton" onClick={() => this.addActivity(object.description)}>
                                    <ActivityButton key={index} description={object.description}/>
                                </div>
                            )
                        )}
                    </div>

                    <div className={`modal ${active}`}>
                        <div className="modal-background" />
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Modal Title</p>
                                <button className="delete" aria-label="close" onClick={this.addActivity}></button>
                            </header>
                            <div className="form">
                                <section class="modal-card-body">
                                    <div className="field">
                                        <div className="label">Activity Name</div>
                                        <div className="control">
                                            <input className="input" type="text" placeholder={this.state.selectedActivity} disabled/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="label">Goal</div>
                                        Hours 
                                        <div className="select is-small">
                                            <select name="modalHours" onChange={this.handleChange}>
                                                {hours.map((hour) => (
                                                    <option value={hour}>{hour}</option>
                                                ))}
                                            </select>
                                        </div>
                                        Minutes 
                                        <div className="select is-small">
                                            <select name="modalMins" onChange={this.handleChange}>
                                                {mins.map((min) => (
                                                    <option value={min}>{min}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-primary" onClick={this.handleSubmit}>Save and Add Activity</button>
                                    <button className="button">Cancel</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }    
}