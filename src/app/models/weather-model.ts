export class WeatherModel {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Cloud;
    dt: number;
    sys: Sys ;
    timezone: number;
    id:number;
    name: string;
    cod: number;
}
export class Coord {
    lat: number;
    lon: number;
}
export class Weather{
   id: number;
   main: string; 
   description: string;
   icon: string;
}
export class Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
export class Wind{
     speed: number;
     deg: number;
     gust: number; 

}
export class Cloud{
    all: number; 

}
export class Sys{ 
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number }