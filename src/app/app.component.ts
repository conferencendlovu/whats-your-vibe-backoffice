import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "WYV - Back Office v1.0";

  user: firebase.User;

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit() {
    this.as.getUserState().subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.as.logOutUser().then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
