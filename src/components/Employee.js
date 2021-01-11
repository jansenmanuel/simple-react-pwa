import React, { Component } from 'react';
import firebase from '../util/firebase';
import Empty from './Empty';
// import API from '../services';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('Employee');
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
        // JSON-Server
        // API.getDataEmployee().then(res => {
        //     const employee = res.data;
        //     this.setState({ employee });
        // })

        // Firebase - Realtime Database
        const employeeRef = firebase.database().ref('Employee');
        employeeRef.on('value', snapshot => {
            const employees = snapshot.val();
            const employeeList = [];
            for (let id in employees) {
                employeeList.push({ id, ...employees[id] });
            }
            this.setState({
                employee: employeeList
            });
        })

        // Firebase - Cloud Firestore
        // this.ref.onSnapshot(snapshot => {
        //     snapshot.docChanges().forEach(change => {
        //         if (change.type === 'added') {
        //             const data = change.doc.data()
        //             data.id = change.doc.id
        //             this.setState({
        //                 employee: [...this.state.employee, data]
        //             })
        //         }
        //         if (change.type === 'modified') {
        //             const results = this.state.employee.map(item => {
        //                 if (item.id === change.doc.id) {
        //                     let data = { ...item, ...change.doc.data() }
        //                     return data
        //                 }
        //                 return item
        //             })
        //             this.setState({
        //                 employee: results
        //             })
        //         }
        //         if (change.type === 'removed') {
        //             this.setState({
        //                 employee: this.state.employee.filter(item => item.id !== change.doc.id)
        //             })
        //         }
        //     });
        // })
    }

    postDataEmployee = () => {
        // JSON-Server
        // API.postDataEmployee(employee).then(res => {
        //     console.log(res);
        //     this.getDataEmployee();
        //     this.setState({
        //         name: '',
        //         job: '',
        //         phone: ''
        //     });
        //     window.M.toast({ html: 'Successful Add New Employee!' });
        // }).catch(() => {
        //     window.M.toast({ html: "Sorry, You're Offline!" });
        // })

        // Firebase - Realtime Database
        const employeeRef = firebase.database().ref('Employee');
        const employee = {
            name: this.state.name,
            job: this.state.job,
            phone: this.state.phone,
        };
        employeeRef.push(employee).then(() => {
            window.M.toast({ html: 'Successful Add New Employee!' });
        }).catch(() => {
            window.M.toast({ html: "Sorry, You're Offline!" });
        })

        // Firebase - Cloud Firestore
        // this.ref.add({
        //     name: this.state.name,
        //     job: this.state.job,
        //     phone: this.state.phone,
        // }).then(() => {
        //     window.M.toast({ html: 'Successful Add New Employee!' });
        // }).catch(() => {
        //     window.M.toast({ html: "Sorry, You're Offline!" });
        // })
    }

    putDataEmployee = () => {
        // JSON-Server
        // API.putDataEmployee(employee, employee.id).then(res => {
        //     console.log(res);
        //     this.getDataEmployee();
        //     this.setState({
        //         name: '',
        //         job: '',
        //         phone: ''
        //     });
        //     window.M.toast({ html: 'Successful Update Employee!' });
        // }).catch(() => {
        //     window.M.toast({ html: "Sorry, You're Offline!" });
        // })

        // Firebase - Realtime Database
        const employeeRef = firebase.database().ref('Employee').child(this.state.id);
        employeeRef.update({
            name: this.state.name,
            job: this.state.job,
            phone: this.state.phone,
        }).then(() => {
            window.M.toast({ html: 'Successful Update Employee!' })
        }).catch(() => {
            window.M.toast({ html: "Sorry, You're Offline!" })
        })

        // Firebase - Cloud Firestore
        // const updateEmployee = this.ref.doc(this.state.id);
        // updateEmployee.set({
        //     name: this.state.name,
        //     job: this.state.job,
        //     phone: this.state.phone,
        // }).then(() => {
        //     window.M.toast({ html: 'Successful Update Employee!' })
        // }).catch(() => {
        //     window.M.toast({ html: "Sorry, You're Offline!" })
        // })
    }

    deleteDataEmployee = id => {
        // JSON-Server
        // API.deleteDataEmployee(id).then(res => {
        //     console.log(res);
        //     this.getDataEmployee();
        //     window.M.toast({ html: 'Successful Delete Employee!' });
        // }).catch(() => {
        //     window.M.toast({ html: "Sorry, You're Offline!" })
        // })

        // Firebase - Realtime Database
        const employeeRef = firebase.database().ref('Employee').child(id);
        employeeRef.remove().then(() => {
            window.M.toast({ html: 'Successful Delete Employee!' })
        }).catch(() => {
            window.M.toast({ html: "Sorry, You're Offline!" })
        })

        // Firebase - Cloud Firestore
        // this.ref.doc(id).delete().then(() => {
        //         window.M.toast({ html: 'Successful Delete Employee!' })
        //     }).catch(() => {
        //         window.M.toast({ html: "Sorry, You're Offline!" })
        //     })
    }

    componentDidMount() {
        this.getDataEmployee();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        // JSON-Server
        // if (this.state.isUpdate) {
        //     const employee = {
        //         id: this.state.id,
        //         name: this.state.name,
        //         job: this.state.job,
        //         phone: this.state.phone,
        //     };
        //     this.putDataEmployee(employee);
        // } else {
        //     const employee = {
        //         id: new Date().getTime(),
        //         name: this.state.name,
        //         job: this.state.job,
        //         phone: this.state.phone,
        //     };
        //     this.postDataEmployee(employee);
        // }

        // Firebase
        if (this.state.isUpdate) {
            this.putDataEmployee();
        } else {
            this.postDataEmployee();
        }

        let instance = window.M.Sidenav.getInstance(window.Sidenav);
        instance.close();
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
                    this.state.employee.length < 1 ? <Empty /> :
                        <div>
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
                        </div>
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

export default Employee;