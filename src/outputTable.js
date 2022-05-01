import React from "react";

const OutputTable = (props) => {
    return (
        <table className="output-table">
            <thead>
                <tr>
                    <th className="code-head">Code</th>
                    <th className="amount-head">Amount ({props.fromCurrency})</th>
                    <th className="rate-head">Rate</th>
                </tr>
            </thead>
            <tbody>
                {props.calculatedRates.map((rate) => {
                    return (
                        <tr key={rate.to}>
                            <td className="code">{rate.to}</td>
                            <td className="amount">{rate.amount}</td>
                            <td className="rate">{rate.result}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OutputTable;