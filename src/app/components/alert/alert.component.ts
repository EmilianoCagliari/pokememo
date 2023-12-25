import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GamedataService } from '../../services/gamedata.service';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  
  public router = inject(Router);
  public pokeService = inject(PokeapiService);
  public gdService = inject(GamedataService);

  userName!: string;
  time!: number;

  ngOnInit(): void {
    this.userName = this.pokeService.getOpt.value.name;
    this.time = this.gdService.getTimer;
  }

  endGame() {
    this.gdService.endGameClear();
    this.pokeService.clearOpt();
    this.router.navigate(['new']);
  }
}
