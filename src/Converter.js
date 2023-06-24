import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import "./converter.css";
import {RiCoinsFill} from 'react-icons/ri'

function Converter() {
    const [optionList, setOptionList] = useState([]); // State to store the list of currency options
    const [inputValue, setInputValue] = useState(0); // State to store the input value
    const [firstSelectValue, setFirstSelectValue] = useState("BTC"); // State to store the value of the first select input
    const [secondSelectValue, setSecondSelectValue] = useState("ETH"); // State to store the value of the second select input
    const [result,setResult]=useState("0"); //state to store the value of result
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);
     
    useEffect(()=>{//Triggers when either of the value in array changes
        if(optionList.length==0)return
       const firstSelectRate=optionList.find((item)=>{
           return item.value===firstSelectValue;
       }).rate//fetch the rate of first selected  value
       const secondSelectRate=optionList.find((item)=>{
         return item.value===secondSelectValue;
        }).rate// fetch the rate for second select value
        const resultValue=(inputValue*secondSelectRate)/firstSelectRate;// calculate the actual rate i,e convert currency
        setResult(parseFloat(resultValue).toFixed(2));// update the result value
    },[inputValue,firstSelectValue,secondSelectValue])

    async function fetchData() {
        const response = await fetch(apiUrl); // Fetch data from the API
        const jsonData = await response.json(); // Parse the response as JSON

        const data = jsonData.rates;
        const tempArray = Object.entries(data).map(item=>{
            return{
                label:item[1].name,
                value:item[1].unit,
                rate:item[1].value,
            }
        });
        setOptionList(tempArray); // Update the option list with the fetched data
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update the input value when it changes
    };
     

    return (
        <div className="container">
            <Card className="crypto-card" title={<h1> <RiCoinsFill/>Crypto Converter</h1>}>
                <Form>
                    <Form.Item>
                        <Input 
                          value={inputValue} 
                          onChange={handleInputChange} 
                          placeholder="Enter the Amount here"
                          style={{textAlign:"center"}}
                        /> {/* Input field for entering the value to convert */}
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select
                        value={firstSelectValue}
                        style={{ width: "100px" }}
                        onChange={(value)=>{setFirstSelectValue(value)}}
                        options={optionList}
                    /> {/* Select input for choosing the first currency */}
                    <Select
                        value={secondSelectValue}
                        style={{ width: "100px" }}
                        onChange={(unit)=>{setSecondSelectValue(unit)}}
                        options={optionList}
                    /> {/* Select input for choosing the second currency */}
                </div>
                <p>
                    {inputValue} {firstSelectValue.toUpperCase()} is:{" "}
                    {result} {secondSelectValue.toUpperCase()}
                </p> {/* Display the converted value */}
            </Card>
        </div>
    );
}

export default Converter;