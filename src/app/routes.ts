import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { RegisterRetaurantComponent } from './restaurant/register-retaurant/register-retaurant.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'restaurants', component: RestaurantListComponent },
    { path: 'restaurants/register', component: RegisterRetaurantComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

