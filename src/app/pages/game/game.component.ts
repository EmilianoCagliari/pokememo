import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { CardComponent } from '../../components/card/card.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { PokemonResponse } from '@interfaces/pokemonResponse';
import { Pokemon } from '@interfaces/pokemon';
import { GamedataService } from '../../services/gamedata.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CardComponent,
    SpinnerComponent,
    AlertComponent,
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})

export class GameComponent implements OnInit {

  public gdService = inject(GamedataService);
  public pokeService = inject(PokeapiService);
  public router = inject(Router);

  loading = false;

  time!: number;

  winner: boolean | undefined;

  pokemonList: Pokemon[] = [];

  pokeTypes = [
    {
      "name": "bug",
      "newName": "grass"
    },
    {
      "name": "ghost",
      "newName": "ground"
    },
    {
      "name": "rock",
      "newName": "steel"
    },
    {
      "name": "poison",
      "newName": "fairy"
    },
    {
      "name": "ice",
      "newName": "water"
    },

  ]

  constructor() {
    this.time = this.gdService.getTimer;

    this.gdService.timer$.subscribe({
      next: (v) => {
        this.time = v;
      }
    })
  }

  ngOnInit(): void {
    // this.getPokemon();
    // console.log(this.time);

    

    this.gdService.winner$.subscribe({
      next: (v) => {
        this.winner = v;
      }
    });



    try {
      this.getPokemonList(
        this.pokeService.getOpt.value.dificulty
        // 6
      );

    } catch (error) {
      this.router.navigate(['new']);
    }

  }


  getPokemonList(qty: number) {

    let arrList = this.generateArrNumber(qty);

    // console.log("list:", arrList);


    arrList.forEach(async (v) => {
      const poke = new Pokemon();
      poke.id = v.toString();

      try {
        this.pokeService.getPoke(v.toString()).subscribe({
          next: (pokeResp: PokemonResponse) => {

            // console.log("Type:", pokeResp.types[0].type.name);

            poke.img = pokeResp.sprites.other?.showdown.front_default;
            poke.name = pokeResp.name;
            poke.type = this.pokeTypes.find(type => type.name === pokeResp.types[0].type.name)?.newName || pokeResp.types[0].type.name;
            this.gdService.setPokemonList(poke);
          }
        });
      } catch (err) {
        console.log("Error:", err);
      }

    });

    this.loading = false;

    //Shuffle objects
    this.gdService.pokemonListSort();
    // console.log("POKELIST:", this.gdService.getPokemonList);

    this.pokemonList = this.gdService.getPokemonList;

    // this.pokeService.getPoke('25').subscribe({
    //   next:  (resp: PokemonResponse) => {
    //     console.log(resp.sprites.other?.['official-artwork'].front_default);

    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // });
  }

  private generateArrNumber(cant: number) {
    const limit: number = cant;
    let arrResp: number[] = [];

    for (let i = 0; i < limit; i++) {
      const rand = Math.round((Math.random() * 150));

      if (!arrResp.includes(rand)) {
        arrResp.push(rand, rand);
      } else {
        // console.log('Valor Repetido');
        i--;
      }

    }
    // console.log('Arr Resp: ', arrResp);

    //Shuffle Array to order cards to show
    this.shuffle(arrResp);
    return arrResp;

  }


  private shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
    // return array.sort(() => Math.random() - 0.5);

  }





}
