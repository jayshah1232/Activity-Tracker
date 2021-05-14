import React, { Component } from 'react';
import "./styles/activitycard.css"

export default class ActivityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityName: '',
            goalTime: '',
            currentTime: '',
            percentage: 0,
        }
    }

    componentDidMount() {
        this.setState({
            activityName: this.props.name,
            goalTime: this.props.goalTime,
            currentTime: this.props.currentTime,
            percentage: (this.props.currentTime/this.props.goalTime)*100
        });
    }

    render() {
        console.log(this.state.percentage);
        return(
            <div className="card" id="activitycard">
                <header className="card-header">
                    {this.state.activityName}
                </header>
                <div className="card-conent">
                    <p className="title is-4">Goal: {this.state.goalTime}</p>
                    <div className="content">
                        <p>{this.state.currentTime} hrs / {this.state.goalTime} hrs</p>
                        <progress className="progress" value={this.state.percentage} max="100">15%</progress>
                    </div>
                </div>
            </div>
        )
    }
}