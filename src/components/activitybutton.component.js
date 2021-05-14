import React, { Component } from 'react';

export default class ActivityButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ''
        }
    }

    componentDidMount() {
        this.setState({ description: this.props.description });
    }

    render() {
        return(
            <div>
                <button className="button is-primary">{this.props.description}</button>
                <button className="delete" aria-label="close" onClick={this.addActivity}></button>
            </div>
        )
    }
}