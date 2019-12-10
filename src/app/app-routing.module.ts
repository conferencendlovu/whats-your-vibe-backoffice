import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { BusinessesComponent } from "./components/businesses/businesses.component";
import { EventsComponent } from "./components/events/events.component";
import { LoginComponent } from "./components/login/login.component";
import { VibersComponent } from "./components/vibers/vibers.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "events",
    component: EventsComponent
  },
  {
    path: "businesses",
    component: BusinessesComponent
  },
  {
    path: "vibers",
    component: VibersComponent
  },
  {
    path: "",
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
