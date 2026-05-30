import { Routes } from '@angular/router';
import { CardOverviewComponent } from './components/card-overview/card-overview.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CardOverviewComponent, canActivate: [authGuard] },
  { path: 'card/:id', component: CardDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
