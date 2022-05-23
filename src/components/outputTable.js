import React from "react";

import Styles from "../styles/outputTable.module.scss";

const OutputTable = (props) => {
    return (
        <table className={Styles["output-table"]}>
            <thead>
                <tr>
                    <th className={Styles["code-head"]}>Code</th>
                    <th className={Styles["amount-head"]}>Amount ({props.fromCurrency})</th>
                    <th className={Styles["rate-head"]}>Rate</th>
                </tr>
            </thead>
            <tbody>
                {props.calculatedRates.map((rate) => {
                    return (
                        <tr key={rate.to}>
                            <td className={Styles["code"]}>{rate.to}</td>
                            <td className={Styles["amount"]}>{rate.amount}</td>
                            <td className={Styles["rate"]}>{rate.result}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OutputTable;