import React from 'react'

const Navbar = ({ headerProps }) => {

    return (
        <div className="d-block">
            <header className={`navbar navbar-expand-lg ${headerProps.className}`}>
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <span><ion-icon name="calendar"></ion-icon></span>
                        <span>{headerProps.brandName}</span>
                    </div>
                    <div className="d-flex">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="btn btn-outline-success" type="button" onClick={headerProps.clickFunction}>{headerProps.buttonName}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar
