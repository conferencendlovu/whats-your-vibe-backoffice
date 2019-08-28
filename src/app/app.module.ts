import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { ConsumersComponent } from './components/consumers/consumers.component';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import {FirebaseService} from "./services/firebase.service";
import { EventsComponent } from './components/events/events.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusinessesComponent,
    ConsumersComponent,
    MembershipsComponent,
    CategoriesComponent,
    AnalyticsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'WYV Back Office'),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
