import React, { Component } from 'react';
import Employee from './Employee';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Home Page</h1>
                <Employee />
            </div>
        );
    }
}

export default Home;