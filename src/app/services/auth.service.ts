import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { map, filter } from "rxjs/operators";
import { Router } from "@angular/router";
import { of as observableOf } from "rxjs";
import { auth } from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  getUserState() {
    return this.afAuth.authState;
  }

  doLogin(formData) {
    let username = formData.username.toString().trim() + "@wyv.io";
    let password = formData.password.toString().trim();

    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }

  doLogout() {
    this.afAuth.auth.signOut();
  }
}
