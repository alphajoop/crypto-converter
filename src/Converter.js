import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import "./converter.css";

function Converter() {
    const [optionList, setOptionList] = useState([]); // State to store the list of currency options
    const [inputValue, setInputValue] = useState("0"); // State to store the input value
    const [firstSelectValue, setFirstSelectValue] = useState("btc"); // State to store the value of the first select input
    const [secondSelectValue, setSecondSelectValue] = useState("eth"); // State to store the value of the second select input

    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    async function fetchData() {
        const response = await fetch(apiUrl); // Fetch data from the API
        const jsonData = await response.json(); // Parse the response as JSON

        const data = jsonData.rates;
        const tempArray = Object.entries(data).map(([key, value]) => ({
            label: value.name,
            value: key,
            rate: value.value,
        }));

        setOptionList(tempArray); // Update the option list with the fetched data
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the input value when it changes
    };

    const convertCurrency = () => {
        const firstRate = optionList.find(
            (option) => option.value === firstSelectValue
        )?.rate; // Find the rate of the selected first currency
        const secondRate = optionList.find(
            (option) => option.value === secondSelectValue
        )?.rate; // Find the rate of the selected second currency

        if (typeof firstRate === "undefined" || typeof secondRate === "undefined") {
            return "N/A"; // If the rates are undefined, return "N/A"
        }

        const convertedValue =
            (parseFloat(inputValue) * secondRate) / firstRate || 0; // Calculate the converted value

        return convertedValue.toFixed(2); // Return the converted value rounded to 2 decimal places
    };

    return (
        <div className="container">
            <Card className="crypto-card" title={<h1>Crypto Converter</h1>}>
                <Form>
                    <Form.Item>
                        <Input value={inputValue} onChange={handleInputChange} /> {/* Input field for entering the value to convert */}
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select
                        value={firstSelectValue}
                        style={{ width: "100px" }}
                        onChange={setFirstSelectValue}
                        options={optionList}
                    /> {/* Select input for choosing the first currency */}
                    <Select
                        value={secondSelectValue}
                        style={{ width: "100px" }}
                        onChange={setSecondSelectValue}
                        options={optionList}
                    /> {/* Select input for choosing the second currency */}
                </div>
                <p>
                    {inputValue} {firstSelectValue.toUpperCase()} is:{" "}
                    {convertCurrency()} {secondSelectValue.toUpperCase()}
                </p> {/* Display the converted value */}
            </Card>
        </div>
    );
}

export default Converter;