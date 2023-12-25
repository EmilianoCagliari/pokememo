import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PokemonResponse } from '../interfaces/pokemonResponse';
import { PokeCharacteristicResponse } from '../interfaces/pokeCharacteristicResponse';

@Injectable({
  providedIn: 'root'
})

export class PokeapiService {

  private _opt: any = [];

  get getOpt() {
    return this._opt;
  }

  setOpt(data: any) {
    this._opt = data;
  }

  clearOpt() {
    this._opt = [];
  }

  constructor(private http: HttpClient) {
    console.log('Http Service Listo!');
  }

  private getQuery(query: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    return this.http.get(url);
  }


  getPoke(id: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get<PokemonResponse>(url);
  }

  getPokeCharacteristic(id: string) {
    const url = `https://pokeapi.co/api/v2/characteristic/${id}`;
    return this.http.get<PokeCharacteristicResponse>(url);
  }

}
