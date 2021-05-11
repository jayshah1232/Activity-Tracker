import React, { Component } from 'react';
import axios from 'axios';
import ActivityButton from './activitybutton.component';

export default class ActivitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            return {
                activities: [...prevState.activities, this.props.activities],
                isLoading: this.props.isLoading,
            }
        })
        console.log(this.state.activities);
        console.log(this.props.activities);
        // const user = JSON.parse(localStorage.getItem('user'));
        // axios.get('http://localhost:8080/users/useractivities', {
        //     params: {
        //         token: user.jwtToken
        //     }
        // })
        // .then(res => {
        //     const getResult = res.data;
        //     console.log(getResult);
        //     this.setState({ activities: getResult });
        //     this.setState({ changeReceived: this.props.changeReceived })
        //     console.log(this.state.activities);
        // })
        // .then(data => {
        //     this.setState({ isLoading: false });
        // })
    }

    render() {
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
                    {activitiesList.map((object, index) => 
                        (
                            <div>
                                <ActivityButton key={index} description={object.description} />
                            </div>
                        )
                    )}
                </div>
            )
        }
    }    
}