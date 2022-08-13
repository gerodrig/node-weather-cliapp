import fs from 'fs';

import axios from 'axios';
import 'dotenv/config';
import { MapboxResponse, City, Weather, OpenWeatherResponse} from './';

export class Searches {

    private dbPath: string = './src/db/database.json';

    constructor(public history: string[] = []) { 
        //read DB if it exists
        this.readDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get capitalizedHistory(): string[] {
        return this.history.map(place => {
            //capitalize each word
            return place.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        });
    }

    paramsOpenWeather(lat:string = '1', lon: string = '1', units: string = 'metric'): any {
        return {
            lat,
            lon,
            appid: process.env.OPEN_WEATHER_KEY,
            units
        }
    }

    //methods
    async searchCities(place: string = ''): Promise<City[]> {
        //TODO: http request.
        // console.log('city', place);
        try {
            //http request
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/`,
                params: this.paramsMapbox
            });


            const {data} = await instance.get<MapboxResponse>(`${place}.json`);
            const places = data.features.map<City>( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
    
            return places; //return places that match the search
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async weatherByCity({lat, lng}: City): Promise<Weather> {

        try {

            //axios instance
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/`,
                params: this.paramsOpenWeather(lat.toString(), lng.toString())
            });
            //respdata
            const {data} = await instance.get<OpenWeatherResponse>('weather');
            const {weather, main} = data;
            return {
                description: weather[0].description.green,
                temperature: main.temp.toString().yellow,
                highest: main.temp_max.toString().yellow,
                lowest: main.temp_min.toString().yellow,
            }
            
        } catch (error: any) {
            throw new Error(error);
        }
    }

    addToHistory(place: string = ''){
        //TODO: prevent duplicates
        if(this.history.includes(place.toLocaleLowerCase())) return;

        //keep only the last 5 registry
        //this.history = this.history.slice(0, 5);

        this.history.unshift(place.toLocaleLowerCase());

        //Save in DB
        this.saveDB();
    }

    printHistory(): void {
        this.capitalizedHistory.forEach((place, i) => {
            const idx = `${i + 1}.`.green;
            console.log(idx, place);
        });
    }

    saveDB(): void {
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB(): void {

        //checxk if file exists
        if(!fs.existsSync(this.dbPath)) return;

        const payload = fs.readFileSync(this.dbPath, 'utf8');
        const {history} = JSON.parse(payload);
        this.history = history;
    }
}