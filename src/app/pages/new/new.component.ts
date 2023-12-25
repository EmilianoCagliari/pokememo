import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { PokeapiService } from '../../services/pokeapi.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export default class NewComponent {
  
  public pokeService = inject(PokeapiService);
  public router = inject(Router);

  public newGameform!: FormGroup;



  setValue() {
    // console.log(this.newGameform.value);
    this.pokeService.setOpt(this.newGameform);
    this.router.navigate(['game']);
  }

  ngOnInit(): void {
    this.newGameform = new FormGroup( 
      {
        name: new FormControl( '', [Validators.required ]),
        dificulty: new FormControl('', [Validators.required]) 
      }
    )

  }
}
