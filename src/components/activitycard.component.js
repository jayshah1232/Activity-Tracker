import React, { Component } from 'react';
import "./styles/activitycard.css"

export default class ActivityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityName: '',
            goalTime: '',
            currentTime: ''
        }
    }

    componentDidMount() {
        this.setState({
            activityName: this.props.name,
            goalTime: this.props.goalTime,
            currentTime: this.props.currentTime
        })
    }

    render() {
        return(
            <div className="card" id="activitycard">
                <header className="card-header">
                    {this.state.activityName}
                </header>
                <div className="card-conent">
                    <p className="title is-4">Goal: {this.state.goalTime}</p>
                    <div className="content">
                        <p>{this.state.currentTime} hrs / {this.state.goalTime} hrs</p>
                        <progress className="progress" value="15" max="100">15%</progress>
                    </div>
                </div>
            </div>
        )
    }
}