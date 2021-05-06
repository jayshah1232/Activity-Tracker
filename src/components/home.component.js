import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: "NOT_LOGGED_IN"
        }
    }

    componentDidMount() {
        this.setState({
            userStatus: this.props.loggedInStatus
        })
    }

    render() {
        return(
            <div>
                <p>Wagwan</p>
                <h2>Status: {this.state.userStatus}</h2>
            </div>
        )
    }
}