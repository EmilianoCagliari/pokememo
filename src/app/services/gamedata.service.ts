import { Injectable } from '@angular/core';
import { Pokemon } from '@interfaces/pokemon';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamedataService {

  constructor() { }

  private _pokemonList: Pokemon[] = [];
  private _cardMatch: Pokemon[] = [];
  private _cardFinded: Pokemon[] = [];

  private _winner: boolean = false;
  winner$ = new Subject<boolean>();

  private _timer: number = 0;
  timer$ = new Subject<number>();

  private _stTime: any;


  startTimer() {
    console.log("StartT");
    this._timer = 1;
    if(!this._stTime) {

      this._stTime = setInterval( () => {
        
       this.timer$.next( this._timer++ );      
      //  console.log("Start Timer:", this._timer);
       
     }, 1000);  
    }
  }

  endTimer() {
    clearInterval(this._stTime);
  }

  get getTimer(): number {
    return this._timer;
  }



  get getWinner(): boolean {
    return this._winner;
  }

  setWinner(isWinner: boolean): void {
    this._winner = isWinner;
    this.winner$.next(this._winner);
  }



  get getPokemonList(): Pokemon[] {
    return this._pokemonList;
  }
  setPokemonList(value: Pokemon) {
    this._pokemonList.push(value);
  }

  pokemonListSort() {
    this._pokemonList.sort(() => Math.random() - 0.5);
  }




  get getCardFinded(): Pokemon[] {
    return this._cardFinded;
  }

  setCardFinded(value: Pokemon) {
    this._cardFinded.push(value);
  }

  get getCardMatch(): Pokemon[] {
    return this._cardMatch;
  }

  setCardMatch(poke: Pokemon) {
    this._cardMatch.push(poke);
  }


  endGameClear() {
    this._cardMatch = [];
    this._cardFinded = [];
    this._pokemonList = [];
  }



}
