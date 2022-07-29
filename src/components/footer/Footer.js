import React from 'react';

import { Link } from 'react-router-dom';

import footerbg from '../../assets/footer-bg.jpg';
import logo from '../../assets/logo.png';

export const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${footerbg})` }}>
            <div className="footer_content container">
                <div className="footer_content_logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">MS Movies</Link>
                    </div>
                </div>

                <div className="footer_content_menus">
                    <div className="footer_content_menu">
                        <Link to="/">Home</Link>
                        <Link to="/movie">Recent release</Link>
                        <Link to="/privacy-policy">Privacy policy</Link>
                    </div>

                </div>


            </div>
            <br />
            <p className="credits">&copy; 2022 Melquisedec Sepúlveda - Created using TMDB</p>
        </div>
    )
}
