import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { LoginComponent } from './components/login.component';
import { PlannerComponent } from './components/planner.component';
import { RecipeComponent } from './components/recipe.component';
import { SearchComponent } from './components/search.component';
import { RecipeService } from './recipe.service';
import { PlannerService } from './planner.service';
import { AuthService } from './auth.service';
import { AdminComponent } from './components/admin.component';
import { AdminService } from './admin.service';
import { NavbarComponent } from './components/navbar.component';

// Configure routes
const ROUTES: Routes = [
  { path: '', component: RecipeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthService ] },
  { path: 'planner', component: PlannerComponent, canActivate: [ AuthService ] },
  { path: 'recipe', component: RecipeComponent},
  { path: 'search', component: SearchComponent, canActivate: [ AuthService ] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    PlannerComponent,
    RecipeComponent,
    SearchComponent,
    AdminComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [ RecipeService, PlannerService, AuthService, AdminService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
