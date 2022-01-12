import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherModel } from '../models/weather-model';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) {
  }

  private weatherUrl = environment.api_url;
  private apikey = environment.api_key;


  //getWeatherData
  getWeatherAPI(city:string):Observable<WeatherModel>{
    return this.http.get<WeatherModel>(`${this.weatherUrl}/weather?q=${city}&appid=${this.apikey}`)
   }

   //getForecastData
   getForecast(lat:number,lon:number):Observable<any>{
     return this.http.get<any>(`${this.weatherUrl}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${this.apikey}`)
   }

  // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=1100a14676c9af7cc70e0c4f24e3429d

   //https://api.openweathermap.org/data/2.5/weather?q=Bangkok&appid=1100a14676c9af7cc70e0c4f24e3429d

}
