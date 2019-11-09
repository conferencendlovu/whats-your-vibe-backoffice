import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BusinessesComponent } from "./components/businesses/businesses.component";
import { ConsumersComponent } from "./components/consumers/consumers.component";
import { MembershipsComponent } from "./components/memberships/memberships.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { AnalyticsComponent } from "./components/analytics/analytics.component";
import { FirebaseService } from "./services/firebase.service";
import { EventsComponent } from "./components/events/events.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusinessesComponent,
    ConsumersComponent,
    MembershipsComponent,
    CategoriesComponent,
    AnalyticsComponent,
    EventsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      "WYV Back Office"
    ),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
