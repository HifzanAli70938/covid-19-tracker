import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Infobox from "./Infobox.js";
import Chart from './Chart.js';

function App() {
  let [country, setCountry] = useState([]);
  let [tableData, setTableData] = useState([]);
  let [countryVal, setCountryVal] = useState('Worldwide');
  let[totalcases,setTotalCases]=useState();
  let[totalrecovered,setTotalRecovered]=useState();
  let[totaldeath,setTotalDeath]=useState();
  console.log(tableData);
  useEffect(()=>{
    let funcData=async()=>{
      let url="https://disease.sh/v3/covid-19/all";
      let fetchData=await fetch(url);
    let getData=await fetchData.json();
    setTotalCases(getData.cases)
    setTotalDeath(getData.deaths)
setTotalRecovered(getData.recovered)
    }
funcData();
    },[])
    useEffect(() => {
      let funcData = async () => {
        let url = "https://disease.sh/v3/covid-19/countries"
        let getData = await fetch(url);
        let jsData = await getData.json();
        setCountry(jsData);
      }
      funcData();
    }, []);

  useEffect(() => {
    let funcData = async () => {
      let url = "https://disease.sh/v3/covid-19/countries"
      let getData = await fetch(url);
      let jsData = await getData.json();
      let sortedData=(data)=>{
      data.sort((a,b)=>a.cases>b.cases?-1:1);
        return data;
      }
      let sor=sortedData(jsData);
      setTableData(sor);
    }
    funcData();
  }, []);
  let onHandle = (e) => {
    let value=e.target.value;
    setCountryVal(value);
    let funData=async()=>{
      let url=`https://disease.sh/v3/covid-19/countries/${value}`;
      let getData=await fetch(url);
      let jsData=await getData.json();
      setTotalCases(jsData.cases);
      setTotalRecovered(jsData.recovered);
      setTotalDeath(jsData.deaths);
    }
    funData();
  }
  return (
    <>
      <div className="App">
        <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="form" >
            <Select variant="outlined" value={countryVal} onChange={onHandle}>
              <MenuItem value={countryVal}>{countryVal}</MenuItem>
              {country.map(({country}) =>
                <MenuItem value={country}>{country}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div className="app_infobox">
          <Infobox title="Cases"  total={totalcases}/>
          <Infobox title="Recovered" total={totalrecovered} />
          <Infobox title="Deaths"  total={totaldeath}/>
        </div>
        </div>
        <div className="app_right">
          <Chart  cases={tableData} />
        </div>
      </div>
    </>
  );
}

export default App;
