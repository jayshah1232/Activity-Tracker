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
            <button className="button is-primary">{this.props.description}</button>
        )
    }
}