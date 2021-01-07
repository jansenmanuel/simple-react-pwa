import React, { Component } from 'react';
import { withRouter } from 'react-router';
import API from '../services';
import Loader from './Loader';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            id: '',
            name: '',
            job: '',
            phone: '',
            isUpdate: false
        }
    }

    getDataEmployee = () => {
        API.getDataEmployee()
            .then(res => {
                const employee = res.data
                this.setState({ employee })
            })
    }

    postDataEmployee = employee => {
        API.postDataEmployee(employee)
            .then(res => {
                console.log(res);
                this.getDataEmployee();
                this.setState({
                    name: '',
                    job: '',
                    phone: ''
                })
                window.M.toast({ html: 'Successful Add New Employee!' })
            })
    }

    putDataEmployee = employee => {
        API.putDataEmployee(employee, employee.id)
            .then(res => {
                console.log(res);
                this.getDataEmployee();
                this.setState({
                    name: '',
                    job: '',
                    phone: ''
                })
                window.M.toast({ html: 'Successful Edit Employee!' })
            })
    }

    deleteDataEmployee = id => {
        API.deleteDataEmployee(id)
            .then(res => {
                console.log(res);
                this.getDataEmployee();
                window.M.toast({ html: 'Successful Delete Employee!' })
            })
    }

    componentDidMount() {
        this.getDataEmployee();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.isUpdate) {
            const employee = {
                id: this.state.id,
                name: this.state.name,
                job: this.state.job,
                phone: this.state.phone,
            };
            this.putDataEmployee(employee);
        } else {
            const employee = {
                id: new Date().getTime(),
                name: this.state.name,
                job: this.state.job,
                phone: this.state.phone,
            };
            this.postDataEmployee(employee);
        }

        let instance = window.M.Sidenav.getInstance(window.Sidenav);
        instance.close();
    }

    handleDetail = id => {
        this.props.history.push('/detail');
        window.EmployeeId = id;
    }

    handleAdd = () => {
        this.setState({
            id: '',
            name: '',
            job: '',
            phone: '',
            isUpdate: false
        })
    }

    handleEdit = data => {
        this.setState({
            id: data.id,
            name: data.name,
            job: data.job,
            phone: data.phone,
            isUpdate: true
        })
    }

    handleDelete = id => {
        this.deleteDataEmployee(id);
    }

    render() {
        return (
            <div style={{ marginBottom: "100px" }}>
                {
                    this.state.employee.length < 1 && <Loader />
                }
                {
                    this.state.employee.map(employee =>
                        <ul className="collection card-employee" key={employee.id}>
                            <li className="collection-item avatar">
                                <i className="material-icons circle blue">account_circle</i>
                                <span className="title">{employee.name}</span>
                                <p>{employee.job}</p>
                                <p>{employee.phone}</p>
                                <p className="secondary-content">
                                    <i
                                        className="material-icons"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.handleDetail(employee.id)}
                                    >
                                        info
                                    </i>
                                    <i
                                        className="material-icons sidenav-trigger"
                                        style={{ cursor: "pointer" }}
                                        data-target="side-form"
                                        onClick={() => this.handleEdit(employee)}
                                    >
                                        edit
                                    </i>
                                    <i
                                        className="material-icons"
                                        style={{ cursor: "pointer" }}
                                        onDoubleClick={() => this.handleDelete(employee.id)}
                                    >
                                        delete
                                    </i>
                                </p>
                            </li>
                        </ul>
                    )
                }
                <div id="side-form" className="sidenav side-form">
                    <form className="container" onSubmit={this.handleSubmit}>
                        <h6>{this.state.isUpdate ? 'Edit' : 'Add New'} Employee</h6><br />
                        <div className="input-field">
                            <label htmlFor="name">Name</label>
                            <input
                                placeholder="ex: Jansen Manuel"
                                value={this.state.name}
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="off"
                                maxLength={30}
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="job">Job Division</label>
                            <input
                                placeholder="ex: Front-end Developer"
                                value={this.state.job}
                                id="job"
                                name="job"
                                type="text"
                                autoComplete="off"
                                maxLength={30}
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="phone">Phone</label>
                            <input
                                placeholder="ex: 081317919123"
                                value={this.state.phone}
                                id="phone"
                                name="phone"
                                type="number"
                                autoComplete="off"
                                maxLength={30}
                                required
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field center">
                            <button className="btn-small">{this.state.isUpdate ? 'Edit' : 'Add'}</button>
                        </div>
                    </form>
                </div>
                <div className="fixed-action-btn add-btn">
                    <a href="!#" className="sidenav-trigger btn-large btn-floating waves-effect waves-light teal" data-target="side-form">
                        <i className="material-icons" onClick={this.handleAdd}>add</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default withRouter(Employee);