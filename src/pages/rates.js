import React from "react";
import BodyLayout from "../components/bodyLayout";

const Rates = () => {

    const instructions = "If you wnat to see latest conversion rates of a currency, select desired code of currency in the first selection menu and you will get table of rates of all available currencies. If you want to see latest conversion rate of a currency to a certain other currency, choose desired currencies in both selection menus."

    return (
        <BodyLayout page="Latest Rates" instructions={instructions} />
    )
}

export default Rates;