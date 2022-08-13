import inquirer from 'inquirer';
import colors from 'colors';
import { menuOptions } from '../menu/menu-options';
import { City } from '../models/interfaces/MapboxResponse.interface';


export const inquirerMenu = async (): Promise<any> => {
    console.clear();
    console.log('============================'.green);
    console.log('    Select an option:'.white);
    console.log('============================\n'.green);

    const {option} = await inquirer.prompt(menuOptions);

    return option;
}

export const readInput = async (message: string): Promise<any> => {

    const {input} = await inquirer.prompt({
        type: 'input',
        name: 'input',
        message,
        validate: (value: string) => {
            if(value.length === 0 ) {
                return 'Please enter a value';
            }
            return true;
        }});

    return input;
}

export const listPlaces = async (places: City[] = []): Promise<any> => {
    
    const choices = places.map(({id, name}: City, index) => {
        const i = `${index + 1}`.green;

        return {
            value: id,
            name: `${i} - ${name}`
        }
    });
    choices.unshift({
        value: '0',
        name: colors.green('0. ') + 'Cancel'
    });

    const options = [{
        type: 'list',
        name: 'id',
        message: 'Select a place:',
        choices
    }];

    const { id } = await inquirer.prompt(options);
    return id;
}

export const pause = async (): Promise<void> => {
    // console.clear();
    console.log('\n');
    await inquirer.prompt({
        type: 'input',
        name: 'pause',
        message: `Press ${ colors.green('ENTER') } to continue...`
    });

}