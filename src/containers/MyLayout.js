import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../components/Header';
import MyRouter from './MyRouter';

class MyLayout extends Component {
    render() {
        return (
            <Router>
                <Header />
                <MyRouter />
            </Router>
        );
    }
}

export default MyLayout;