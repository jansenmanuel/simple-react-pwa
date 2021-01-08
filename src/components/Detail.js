import React, { Component } from 'react';
import Loader from './Loader';
import firebase from '../util/firebase';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        let id = window.EmployeeId;
        const employeeRef = firebase.database().ref('Employee').child(id);
        employeeRef.on('value', snapshot => {
            const employee = snapshot.val();
            this.setState({ employee })
        })
    }

    handleBack = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <h1>Detail Page</h1>
                {
                    this.state.employee.length < 1 && <Loader />
                }
                <span onClick={this.handleBack} style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                    <i className="material-icons">keyboard_arrow_left</i> Back
                </span>
                <div className="card blue-grey darken-1" key={this.state.employee.id}>
                    <div className="card-content white-text">
                        <span className="card-title">{this.state.employee.name}</span>
                        <p>{this.state.employee.job}</p>
                        <p>{this.state.employee.phone}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;