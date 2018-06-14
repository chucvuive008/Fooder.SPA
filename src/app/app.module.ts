import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, BsModalService } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { UserService } from './_services/user.service';
import { AuthModule } from './auth/auth.component';
import { RegisterRetaurantComponent } from './restaurant/register-retaurant/register-retaurant.component';
import { RestaurantService } from './_services/restaurant.service';


@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    RestaurantListComponent,
    HomeComponent,
    MemberEditComponent,
    RegisterRetaurantComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AuthModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    PreventUnsavedChanges,
    MemberEditResolver,
    UserService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
