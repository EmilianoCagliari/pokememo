import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Pokemon } from '@interfaces/pokemon';
import { GamedataService } from '../../services/gamedata.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  public gdservice = inject(GamedataService);


  @Input() pokemon!: Pokemon;


  selected() {
    
    if(this.gdservice.getTimer == 0) {
      this.gdservice.startTimer();
    }
    



    this.pokemon.isSelected = !this.pokemon.isSelected;
    this.gdservice.setCardMatch(this.pokemon);

    let cards = this.gdservice.getCardMatch;
    let cardFinded = this.gdservice.getCardFinded;
    let pokeList = this.gdservice.getPokemonList;

  
    // console.log("ArrCard Init:", this.cardMatch.length);
    if (cards.length == 2) {

      if (cards[0].id === cards[1].id) {

        while (this.gdservice.getCardMatch.length > 0) {
          this.gdservice.setCardFinded(cards[this.gdservice.getCardMatch.length - 1]);
          this.gdservice.getCardMatch.pop();
        }



      } else {

        setTimeout(() => {
          cards[0].isSelected = false;
          cards[1].isSelected = false;

          while (this.gdservice.getCardMatch.length > 0) {
            this.gdservice.getCardMatch.pop();
          }
        }, 750);

      }

    }



    //Game Ended win
    if (cardFinded.length === pokeList.length) {
      setTimeout(() => {
        this.gdservice.setWinner(true);
        this.gdservice.endTimer();
      }, 750);
    }


    // console.log('selected ID:', this.pokemon.id);
  }



}
