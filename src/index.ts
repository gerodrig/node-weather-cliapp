import { inquirerMenu, listPlaces, pause, readInput } from './helpers/inquirer';
import { Searches, City } from './models';


const main = async () => {

    const searches = new Searches();
    let opt: number;

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //Display message
                const searchTerm = await readInput('City:');
                
                //show places
                const places = await searches.searchCities(searchTerm);
                
                //select place
                const selectedId = await listPlaces(places);

                if (selectedId === '0') continue;

                const place = places.find(place => place.id === selectedId) as City;

                //Save in DB
                searches.addToHistory(place.name);
                
                //Show weather details
                const weather = await searches.weatherByCity(place);
                const { name, lat, lng } = place;
                const { description, temperature, highest, lowest } = weather;

                //show results
                console.log('\nCity information\n'.green)
                console.log('City:', name.cyan);
                console.log('Lat:',lat);
                console.log('Long:', lng);
                console.log('Temperature:', temperature);
                console.log('Highest:', highest);
                console.log('Lowest:', lowest);
                console.log('Weather status:', description);
                break;
            case 2:
                searches.printHistory();
                break;
            case 0:
                console.log('Exit selected');
                opt = 0;
                break;
        
            default:
                console.log('Invalid option');
                break;
        }
        if(opt !== 0) await pause();
        
    } while (opt !== 0);
}

main();