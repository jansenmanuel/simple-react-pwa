import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="blue">
                    <div className="container nav-wrapper">
                        <Link to="/" className="brand-logo">Simple React PWA</Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/detail">Detail</Link></li>
                        </ul>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-demo">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/detail">Detail</Link></li>
                </ul>
            </div>
        );
    }
}

export default Header;