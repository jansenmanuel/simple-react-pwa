import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div style={{ position: "fixed", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", top: 0, left: 0, backgroundColor: "#FFFFFF", zIndex: "999" }}>
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle" />
                        </div><div className="gap-patch">
                            <div className="circle" />
                        </div><div className="circle-clipper right">
                            <div className="circle" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;