import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Jansen from '../assets/jansen.JPG';
import Background from '../assets/background.jpg';

class Header extends Component {
    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav className="blue">
                        <div className="container nav-wrapper">
                            {/* <Link to="/" className="brand-logo">React PWA</Link> */}
                            <a href="/" className="brand-logo">React PWA</a>
                            <a href="!#" data-target="side-menu" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                            <ul className="right hide-on-med-and-down">
                                {/* <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li> */}
                                <li><a href="/">Home</a></li>
                                <li><a href="/about">About</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <ul className="sidenav side-nav" id="side-menu">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src={Background} alt="Background" style={{ width: "100%" }} />
                            </div>
                            <p><img className="circle" src={Jansen} alt="Jansen" /></p>
                            <p><span className="white-text name">Jansen Manuel</span></p>
                            <p><span className="white-text email">jansenmanuel010702@gmail.com</span></p>
                        </div>
                    </li>
                    {/* <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li> */}
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;