import React, { useEffect, useState } from "react";
import { Card, Form, Input, Select } from "antd";
import "./converter.css";
function Converter() {
  const [optionList, setOptionList] = useState([]);
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
  const firstDefaultSelectValue="Bitcoin";
  const secondDefaultSelectValue="Ether";
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    // this API returns object of objects
    const data = jsonData.rates;
    // thereby to convert object to array use following method
    const tempArray = Object.entries(data).map((item) => {
      // creating objects with such prop:
      return {
        label: item[1].name,
        value: item[1].name,
        rate: item[1].value,
      };
    });
    setOptionList(tempArray);
  }
  //update the Input Value
  const[inputValue,setInputValue]=useState("0");
  const[firstSelectValue,setFirstSelectValue]=useState("Bitcoin");
  const[secondSelectValue,setSecondSelectValue]=useState("Ether");
  return (
    <div className="container">
      <Card className="crypto-card" title={<h1>Crypto Converter</h1>}>
        <Form>
          <Form.Item>
            <Input onChange={(event)=>{
                setInputValue(event.target.value);
            }}/>
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            defaultValue="Bitcoin"
            style={{ width: "100px" }}
            options={optionList}
          />
          <Select
            defaultValue="Ether"
            style={{ width: "100px" }}
            options={optionList}
          />
        </div>
        <p>2 Bitcoins is:{inputValue}</p>
      </Card>
    </div>
  );
}

export default Converter;
