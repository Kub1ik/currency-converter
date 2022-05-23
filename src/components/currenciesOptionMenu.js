import React from "react";

import Styles from  "../styles/currenciesOptionMenu.module.scss";

const CurrenciesOptionMenu = (props) => {
    const options = props.currencyOptions.map(([key, value]) => {
        return (
            <option key={key} value={key} title={value}>{key}</option>
        );
    });

    options.unshift(
        props.id === "from" ? 
        <option key="default" value="" hidden>Choose currency..</option> : 
        <option key="default" value="">Choose currency..</option>
    );

    return (
        <select 
            className={Styles["option-menu"]}
            name='currencies'
            defaultValue={options[0]}
            onChange={(event) => props.getSelectedCurrency(event.target.value, props.id)}
        >
            {options}
        </select>
    );
};

export default CurrenciesOptionMenu;