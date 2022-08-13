import colors from 'colors';
import { MenuOptions } from '../models';

export const menuOptions: MenuOptions[] = [
{
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
        {
            value: 1,
            name: `${colors.green('1.')} Search city`
        },
        {
            value: 2,
            name: `${colors.green('2.')} Search History`
        },
        {
            value: 0,
            name: `${colors.green('0.')} Exit`
        },
    ]
}
]