import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'restaurants', component: RestaurantListComponent}
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

