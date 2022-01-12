import { Component,  OnInit } from '@angular/core';
import { Main, WeatherModel } from 'src/app/models/weather-model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit  {

  constructor(private weatherService:WeatherService) { }
  city:string;
  temperatureData:WeatherModel;

  //result
  temperatureCelcius:string;
  feelsLike:string;
  temp_low: string;
  temp_high: string;
  date:Date;
  sunriseTime:string;
  sunsetTime:string;

  lat:number;
  lon:number;
  forecast = [];
  arrayWeather = [];

  ngOnInit(): void {
    this.city="Bangkok"
    this.searchCity();

  }

  searchCity(){
    console.log(this.city);
    this.getWeatherService();

  }
  getWeatherService(){
    this.weatherService.getWeatherAPI(this.city).subscribe((data)=>{
        console.log(data);
        this.temperatureData = data;
        
        this.temperatureCelcius = this.calculateWeather(this.temperatureData.main.temp);
        this.feelsLike = this.calculateWeather(this.temperatureData.main.feels_like);
        this.temp_high = this.calculateWeather(this.temperatureData.main.temp_max);
        this.temp_low = this.calculateWeather(this.temperatureData.main.temp_min);

        let sunrise : Date;
        let sunset : Date;
        sunrise= new Date(this.temperatureData.sys.sunrise*1000);
        sunset = new Date(this.temperatureData.sys.sunset*1000)
        this.sunriseTime = sunrise.toLocaleTimeString();
        this.sunsetTime = sunset.toLocaleTimeString(); 

        this.date=new Date (this.temperatureData.dt*1000);
        console.log(this.date.toLocaleString('en-us', {  weekday: 'long' }));

        this.lat = this.temperatureData.coord.lat;
        this.lon = this.temperatureData.coord.lon;
        this.getForecastData();
    })

  }

  getForecastData(){
    this.weatherService.getForecast(this.lat,this.lon).subscribe((data)=>{
      this.forecast = data.daily;
      console.log(this.forecast); 
      this.arrayWeather = [];
     
      
      for (let index = 1; index < this.forecast.length; index++) {
        this.forecast[index].temp.day=this.calculateWeather(this.forecast[index].temp.day );
        this.forecast[index].temp.max=this.calculateWeather(this.forecast[index].temp.max );
        this.forecast[index].temp.min=this.calculateWeather(this.forecast[index].temp.min );
        this.forecast[index].dt= new Date(this.forecast[index].dt*1000).toLocaleString('en-us', {  weekday: 'short' });
        this.arrayWeather.push(this.forecast[index]);
      }

      console.log(this.arrayWeather);
    })
  }

  calculateWeather(param:number){
    let temperature;
    temperature = param;
    let celciusTemperature;
    celciusTemperature = temperature -273.15;
    return celciusTemperature.toFixed(2);

  }





}
