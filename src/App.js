
import React from "react";
import "./App.css"

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
function App ()  {
  const [state,setState]=React.useState({"temperature":null,"city":null,
"country":null,"humidity":null,"description":null,"error":null})
var getWeather = async (e) => {
  const API_KEY="638d12f2b2df4f707c56a6dd46cfce6b";
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
  const data = await api_call.json();
  console.log(data.main.temp)
  
  if (city && country) {
      setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    });}
   
    else {
      setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }
  }
  
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 title-container">
                  <Titles />
                </div>
                <div className="col-md-5  form-container">
                
                  <Form getWeather={getWeather} />
                  
                  <Weather
                    temperature={state.temperature} 
                    humidity={state.humidity}
                    city={state.city}
                    country={state.country}
                    description={state.description}
                    error={state.error}
                  />
                  </div>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default App;
