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
                {/* <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr>
                <tr>
                    <td className="code">EUR</td>
                    <td className="amount">1000</td>
                    <td className="rate">12.3456</td>
                </tr> */}
            </tbody>
        </table>
    )
}

export default OutputTable;