import React from "react";

import Converter from "./converter";
import Styles from "./styles/app.module.scss";

const App = () => {
    return (
        <>
        <div className={Styles["container"]}>
            <Converter />
        </div>
        <footer className={Styles["footer"]}>
            <p>Created by Jakub Krbec. © 2022</p>
        </footer>
        </>
    )
};

export default App;