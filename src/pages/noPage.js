import React from "react";
import { Link } from "react-router-dom";

import Styles from "../styles/noPage.module.scss";
import errorImage from "../images/404.png";

const NoPage = () => {
    return (
        <section className={Styles["body"]}>
            <Link className={Styles["back-button"]} to="/">&#129136; get back Home</Link>
            <section className={Styles["content"]}>
                <h1>404! Page not found</h1>
                <img src={errorImage} alt="404" width="300" />
                <small className={Styles["attribute"]}>
                    <a href="https://lovepik.com/images/png-404.html" target="_blank" rel="noreferrer nofollow">
                        404 Png vectors by Lovepik.com
                    </a>
                </small>
            </section>
        </section>
    )
}

export default NoPage;