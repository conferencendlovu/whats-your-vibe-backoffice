// CORE COMPONENTS
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// FIREBASE MODULES
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/** UI MODULES */
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";

// SERVICES
import { FirebaseService } from "./services/firebase.service";
import { environment } from "../environments/environment";

// COMPONENTS
import { HomeComponent } from "./components/home/home.component";
import { BusinessesComponent } from "./components/businesses/businesses.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { EventsComponent } from "./components/events/events.component";
import { LoginComponent } from "./components/login/login.component";
import { VibersComponent } from './components/vibers/vibers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusinessesComponent,
    CategoriesComponent,
    EventsComponent,
    LoginComponent,
    VibersComponent
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
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger" // set defaults here
    }),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
