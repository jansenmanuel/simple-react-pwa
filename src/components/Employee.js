import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loader from './Loader';
import firebase from '../util/firebase';

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
        const employeeRef = firebase.database().ref('Employee');
        employeeRef.on('value', snapshot => {
            const employees = snapshot.val();
            const employeeList = [];
            for (let id in employees) {
                employeeList.push({ id, ...employees[id] })
            }
            this.setState({
                employee: employeeList
            });
        })
    }

    postDataEmployee = () => {
        const employeeRef = firebase.database().ref('Employee');
        const employee = {
            name: this.state.name,
            job: this.state.job,
            phone: this.state.phone,
        };
        employeeRef.push(employee);
        window.M.toast({ html: 'Successful Add New Employee!' })
    }

    putDataEmployee = () => {
        const employeeRef = firebase.database().ref('Employee').child(this.state.id);
        employeeRef.update({
            name: this.state.name,
            job: this.state.job,
            phone: this.state.phone,
        })
        window.M.toast({ html: 'Successful Update Employee!' })
    }

    deleteDataEmployee = id => {
        const employeeRef = firebase.database().ref('Employee').child(id);
        employeeRef.remove();
        window.M.toast({ html: 'Successful Delete Employee!' })
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
            this.putDataEmployee();
        } else {
            this.postDataEmployee();
        }

        let instance = window.M.Sidenav.getInstance(window.Sidenav);
        instance.close();
    }

    handleDetail = id => {
        window.EmployeeId = id;
        this.props.history.push('/detail');
    }

    handleAdd = () => {
        this.setState({
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