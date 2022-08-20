import React, { Component } from 'react';
import axios from 'axios';

const api = {
  key: '7acf380b4d396164fe42139810dc47b2',
  baseURL: 'https://api.openweathermap.org/data/2.5/'
}

class App extends Component{

  state={
    query:'',
    weather:{},
    noData: false
  }

  search = event => {
    if (event.key === 'Enter') {
      axios.get(`${api.baseURL}weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
        .then(response => {
          console.log(response.data);
          this.setState({query:'',weather:response.data,noData:false});
        })
        .catch(error=>{
          this.setState({noData:true,query:''});
        })
    }
  }

  queryHandler=(value)=>{
    this.setState({query:value});
  }

  dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  render(){
    
    let exists =( (typeof this.state.weather.main !== 'undefined') ? (<div>
      <div className="location-box">
        <div className="location">{this.state.weather.name},{this.state.weather.sys.country}</div>
        <div className="date">{this.dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">{Math.round(this.state.weather.main.temp)}°C</div>
        <div className="weather">{this.state.weather.weather[0].main}</div>
      </div>
    </div>):(''));

    if(this.state.noData===true){
      exists=<div className="weather-box"><h1 className="weather">No data exists</h1></div>
    }

    return (
      <div className={(typeof this.state.weather.main!=='undefined')?(this.state.weather.main.temp>25 ? 'app warm': 'app'):'app'}>
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={event => this.queryHandler(event.target.value)} value={this.state.query} onKeyPress={this.search} />
          </div>
          {exists}
        </main>
      </div>
    );
  }
  
}


export default App;
