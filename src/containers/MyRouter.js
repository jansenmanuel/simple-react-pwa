import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from '../components/About';
import Home from '../components/Home';

class MyRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
            </Switch>
        );
    }
}

export default MyRouter;