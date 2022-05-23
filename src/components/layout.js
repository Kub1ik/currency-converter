import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import Styles from "../styles/layout.module.scss";

const Layout = () => {
    return (
        <div>
            <div className={Styles["container"]}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;