import React from "react";
import { useState, useEffect } from "react";

import CurrenciesOptionMenu from "../components/currenciesOptionMenu";
import OutputTable from "../components/outputTable";
import Styles from "../styles/bodyLayout.module.scss";
import financeImg from "../images/finance-illustration.png";

const BodyLayout = (props) => {
    const [currencyOptions, setCurrencyOptions] = useState({});
    const [currencyOptionsLoaded, setCurrencyOptionsLoaded] = useState(false);
    useEffect(() => {
        fetch("http://data.fixer.io/api/symbols" +
            "?access_key=" + process.env.REACT_APP_ACCESS_KEY)
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

    //returns object of desired rate
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

    //returns array of all currency rates
    const getAllRates = (rates) => {
        const selectedRate = rates.find((rate) => rate[0] === fromCurrency);
        const ratesWithoutSelectedRate = rates.filter((rate) => rate !== selectedRate);

        return ratesWithoutSelectedRate.map((rate) => getResult(selectedRate, rate));
    }

    //fetch conversion rates from an API
    const getConversionRate = () => {
        let resultRates = [];

        if (fromCurrency !== "") {
            setRenderWarning(false);
            if (toCurrency !== "") {
                fetch("http://data.fixer.io/api/latest" +
                    "?access_key=" + process.env.REACT_APP_ACCESS_KEY +
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
                    "?access_key=" + process.env.REACT_APP_ACCESS_KEY)
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

    const [conversionAmount, setConversionAmount] = useState(0);
    const [calculatedConversionResult, setCalculatedConversionResult] = useState(0);
    const [conversionDone, setConversionDone] = useState(false);

    //calculates amount of one currency to another currency
    const calculateResult = (rateFrom, rateTo) => {
        let result = rateTo / rateFrom;
        result *= conversionAmount;

        return result.toFixed(4);
    }

    //event function for conversion
    const convertAmount = () => {
        if (fromCurrency !== "" && toCurrency !== "") {
            setRenderWarning(false);
            fetch("http://data.fixer.io/api/latest" +
                "?access_key=" + process.env.REACT_APP_ACCESS_KEY +
                "&symbols=" + fromCurrency + "," + toCurrency)
                .then((response) => response.json())
                .then((data) => {
                    const rates = Object.entries(data.rates);
                    setCalculatedConversionResult(calculateResult(rates[0][1], rates[1][1]));
                    setConversionDone(true);
                }
                );
        } else {
            setRenderWarning(true);
        }
    }

    //gets currency from selection menu
    const getSelectedCurrency = (currencyOption, optionId) => {
        if (optionId === "from") {
            setFromCurrency(currencyOption);
        } else {
            setToCurrency(currencyOption);
        }
    }

    return (
        <section className={Styles["body"]}>
            <h1>{props.page}</h1>
            <p className={Styles["instructions"]}>
                {props.instructions}
            </p>
            {currencyOptionsLoaded ?
                <>
                    {props.page === "Converter" &&
                        <input
                            type="number"
                            className={Styles["inputField"]}
                            placeholder="Enter amount.."
                            onChange={e => setConversionAmount(e.target.value)}
                        />
                    }

                    <div className={Styles["selection-menu-container"]}>
                        <CurrenciesOptionMenu
                            id="from"
                            currencyOptions={Object.entries(currencyOptions)}
                            getSelectedCurrency={getSelectedCurrency}
                        />
                        {renderWarning && <small className={Styles["warning"]}>Please select currency in the frist selection menu</small>}
                    </div>

                    {props.page === "Converter" &&
                        <input
                            className={Styles["resultField"]}
                            placeholder="Conversion result.."
                            value={conversionDone ? calculatedConversionResult : ""}
                            readOnly
                        />
                    }

                    <div className={Styles["selection-menu-container"]}>
                        <CurrenciesOptionMenu
                            id="to"
                            currencyOptions={Object.entries(currencyOptions)}
                            getSelectedCurrency={getSelectedCurrency}
                        />
                        {props.page !== "Converter" && <small className={Styles["hint"]}>Optional</small>}
                        {renderWarning && props.page === "Converter" &&
                            <small className={Styles["warning"]}>Please select currency in the second selection menu</small>
                        }
                    </div>

                    <button className={Styles["conversion-button"]} onClick={props.page === "Converter" ? convertAmount : getConversionRate}>
                        {props.page !== "Converter" ? "get conversion rate" : "get conversion result"}
                    </button>

                    <hr />

                    {ratesCalculatedBool ?
                        <OutputTable
                            calculatedRates={calculatedRates}
                            fromCurrency={fromCurrency}
                        /> :
                        <div className={Styles["img-container"]}>
                            <img src={financeImg} alt="finance-illustration" width="300" />
                            <small className={Styles["attribute"]}>
                                <a href="https://lovepik.com/images/png-businessfinance.html" target="_blank" rel="noreferrer nofollow">
                                    Business Finance Png vectors by Lovepik.com
                                </a>
                            </small>
                        </div>
                    }                    
                </> :
                <p className={Styles["loading"]}>Loading Currencies...</p>
            }
        </section>
    )
}

export default BodyLayout;