import React from "react";

import Styles from "../styles/footer.module.scss";

const Footer = () => {
    return (
        <footer className={Styles["footer"]}>
            <p>Created by Jakub Krbec. © 2022</p>
        </footer>
    )
}

export default Footer;