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
  uid;
  username = observableOf("Administrator");
  isAdmin = observableOf(true);
  photoURl = observableOf("link-here");

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.getUserState();
  }

  getUserState() {
    this.uid = this.afAuth.authState.pipe(
      map(authState => {
        if (!authState) {
          return null;
        } else {
          authState.uid;
          console.log(authState.uid);
        }
      })
    );

    return this.afAuth.authState;
  }

  doLogin(formData) {
    let username = formData.username.toString().trim() + "@wyv.io";
    let password = formData.password.toString().trim();

    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }

  doLogout() {
    this.afAuth.auth.signOut();
    this.getUserState();
  }
}
