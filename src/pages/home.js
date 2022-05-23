import React from "react";
import { Link } from "react-router-dom";

import Styles from "../styles/home.module.scss";
import financeImg from "../images/finance-illustration.png";

const Home = () => {
    return (
        <section className={Styles["body"]}>
            <h1>Currency Converter</h1>
            <p>
                In this app you can either convert a certain amount of currency to another
                or you can get table of conversion rates.
            </p>
            <Link className={Styles["link"]} to="/rates">Get conversion rates</Link>
            <Link className={Styles["link"]} to="/converter">Convert certain amount</Link>

            <img src={financeImg} alt="finance-illustration" width="300" />
            <small className={Styles["attribute"]}>
                <a href="https://lovepik.com/images/png-businessfinance.html" target="_blank" rel="noreferrer nofollow">
                    Business Finance Png vectors by Lovepik.com
                </a>
            </small>
        </section>
    )
}

export default Home;