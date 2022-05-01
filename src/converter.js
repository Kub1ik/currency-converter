import React from "react";
import { useState, useEffect } from "react";

import CurrenciesOptionMenu from "./currenciesOptionMenu";
import OutputTable from "./outputTable";
import Styles from "./styles/converter.module.scss";

const Converter = () => {
    const ACCESS_KEY = "2fefc3ea4b76c4ae65313c49f49ed92d";

    const [currencyOptions, setCurrencyOptions] = useState({});
    const [currencyOptionsLoaded, setCurrencyOptionsLoaded] = useState(false);
    useEffect(() => {
        fetch("http://data.fixer.io/api/symbols" +
            "?access_key=" + ACCESS_KEY)
            .then((response) =>
                response.json())
            .then((data) => {
                setCurrencyOptions(data.symbols);
                setCurrencyOptionsLoaded(true);
            });
    }, []);

    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [calculatedRates, setCalculatedRates] = useState([]);
    const [ratesCalculatedBool, setRatesCalculatedBool] = useState(false);
    const [renderWarning, setRenderWarning] = useState(false);

    const getResult = (rateFrom, rateTo) => {
        let tmp = rateTo[1] / rateFrom[1];
        let tmpAmount = 1;

        while (true) {
            if (tmp > 1) {
                break;
            }
            tmp *= 10;
            tmpAmount *= 10;
        }

        const resultObject = {
            amount: tmpAmount,
            result: tmp.toFixed(4),
            to: rateTo[0]
        };

        return resultObject;
    }

    const getAllRates = (rates) => {
        const selectedRate = rates.find((rate) => rate[0] === fromCurrency);
        const ratesWithoutSelectedRate = rates.filter((rate) => rate !== selectedRate);

        return ratesWithoutSelectedRate.map((rate) => getResult(selectedRate, rate));
    }

    const getConvertionRate = () => {
        let resultRates = [];

        if (fromCurrency !== "") {
            setRenderWarning(false);
            if (toCurrency !== "") {
                fetch("http://data.fixer.io/api/latest" +
                    "?access_key=" + ACCESS_KEY +
                    "&symbols=" + fromCurrency + "," + toCurrency)
                    .then((response) => response.json())
                    .then((data) => {
                        const rates = Object.entries(data.rates);
                        resultRates.push(getResult(rates[0], rates[1]));
                        setCalculatedRates(resultRates);
                        setRatesCalculatedBool(true);
                    }
                    );
            } else {
                fetch("http://data.fixer.io/api/latest" +
                    "?access_key=" + ACCESS_KEY)
                    .then((response) => response.json())
                    .then((data) => {
                        resultRates = getAllRates(Object.entries(data.rates));
                        setCalculatedRates(resultRates);
                        setRatesCalculatedBool(true);
                    })
            }
        } else {
            setRenderWarning(true);
        }
    }

    const getSelectedCurrency = (currencyOption, optionId) => {
        if (optionId === "from") {
            setFromCurrency(currencyOption);
        } else {
            setToCurrency(currencyOption);
        }
    }

    return (
        <section className={Styles["currency-converter"]}>
            <h1>Currency Converter</h1>
            <p className={Styles["instructions"]}>
                If you wnat to see latest convertion rates of a currency, select desired code of currency in the first selection menu 
                and you will get table of rates of all available currencies. If you want to see latest convertion rate of a currency 
                to a certain other currency, choose desired currencies in both selection menus.
            </p>
            {currencyOptionsLoaded ?
                <>
                    <div className={Styles["selection-menu-container"]}>
                        <CurrenciesOptionMenu
                            id="from"
                            currencyOptions={Object.entries(currencyOptions)}
                            getSelectedCurrency={getSelectedCurrency}
                        />
                        {renderWarning && <small className={Styles["warning"]}>Please select currency in the frist selection menu</small>}
                    </div>
                    <div className={Styles["selection-menu-container"]}>
                        <CurrenciesOptionMenu
                            id="to"
                            currencyOptions={Object.entries(currencyOptions)}
                            getSelectedCurrency={getSelectedCurrency}
                        />
                        <small className={Styles["hint"]}>Optional</small>
                    </div>

                    <button className={Styles["convertion-button"]} onClick={getConvertionRate}>get convertion rate</button>

                    <hr />

                    {ratesCalculatedBool && 
                        <OutputTable 
                            calculatedRates={calculatedRates} 
                            fromCurrency={fromCurrency} 
                        />
                    }
                </> :
                <p>Loading Currencies...</p>
            }
        </section>
    )
}

export default Converter;