import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { HowItWorksComponent } from './pages/how-it-works.component';
import { VotingComponent } from './pages/voting.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'voting', component: VotingComponent },
    { path: '**', redirectTo: '' }
];
