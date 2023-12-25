import { Routes } from '@angular/router';
import HomeComponent from './pages/home/home.component';
import NewComponent from './pages/new/new.component';
import { AboutComponent } from './pages/about/about.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'new', component: NewComponent},
    { path: 'about', component: AboutComponent},
    { path: 'game', component: GameComponent},
    { 
        path: '**', 
        pathMatch: 'full', 
        redirectTo: '/' 
    }
];
