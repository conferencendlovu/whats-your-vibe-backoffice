import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");

  eventAuthError$ = this.eventAuthError.asObservable();

  loggedInUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  getUserState() {
    return this.afAuth.authState;
  }

  loginUser(user) {
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(userCredentials => {
        console.log("Working");
        this.loggedInUser = userCredentials;
        this.router.navigate(["/home"]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logOutUser() {
    return this.afAuth.auth.signOut();
  }
}
