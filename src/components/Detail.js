import React, { Component } from 'react';
import API from '../services';
import Loader from './Loader';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: []
        }
    }

    componentDidMount() {
        let id = window.EmployeeId;
        API.getDetailDataEmployee(id)
            .then(res => {
                let employee = res.data;
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
                {
                    this.state.employee.map(employee =>
                        <div className="card blue-grey darken-1" key={employee.id}>
                            <div className="card-content white-text">
                                <span className="card-title">{employee.name}</span>
                                <p>{employee.job}</p>
                                <p>{employee.phone}</p>
                            </div>
                        </div>)
                }
            </div>
        );
    }
}

export default Detail;