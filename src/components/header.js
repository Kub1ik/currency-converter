import React from "react";
import { Link } from "react-router-dom";

import Styles from "../styles/header.module.scss";

const Header = () => {
    return (
        <header className={Styles["header"]}>
            <nav>
                <ul>
                    <li>                        
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/rates">Latest rates</Link>
                    </li>
                    <li>
                        <Link to="/converter">Converter</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;