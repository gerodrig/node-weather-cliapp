export interface MenuOptions {
    type: string;
    name: string;
    message: string;
    choices: Choices[];
}

interface Choices {
    value: number;
    name: string;
}