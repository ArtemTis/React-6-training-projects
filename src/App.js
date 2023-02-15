import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1)
  // const [rates, setRates] = useState({});

  const ratesRef = useRef({})

  useEffect(() => {
    // fetch('https://cdn.cur.su/api/latest.json')
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.Valute, json.Valute["RUB"] = { "Value": 1 })
        ratesRef.current = [json.Valute, json.Valute["RUB"] = { "Value": 1 }][0];
        onChangeToPrice(1);
      })
      .catch((error) => {
        console.warn(error);
      })
  }, [])

  console.log(ratesRef.current)

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[toCurrency].Value;
    const result = price * ratesRef.current[fromCurrency].Value;
    setToPrice(result);
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    const result = ratesRef.current[toCurrency].Value / ratesRef.current[fromCurrency].Value * value;
    setFromPrice(Math.floor(result * 10000) / 10000)
    setToPrice(value)
  }

  // React.useEffect(() => {
  //   onChangeToPrice(fromPrice)
  // }, [fromCurrency, fromPrice, onChangeToPrice])

  // React.useEffect(() => {
  //   onChangeFromPrice(fromPrice)
  // }, [fromCurrency, fromPrice, onChangeFromPrice])

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
