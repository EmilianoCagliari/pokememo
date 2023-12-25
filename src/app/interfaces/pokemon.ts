import { Pokelist } from "./pokemonList";



export class Pokemon implements Pokelist{

    id!: string;
    name!: string;
    img: string | undefined;
    type!: string;
    desc!: string;
    isSelected: boolean = false;

    constructor() {}
   
}