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
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        authState.uid;
      }
    })
  );
  username = observableOf("ConnieN");
  isAdmin = observableOf(true);
  photoURl = observableOf("link-here");

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  getUserState() {
    return this.afAuth.authState;
  }

  doLogin(formData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      formData.email,
      formData.password
    );
  }

  doLogout() {
    this.afAuth.auth.signOut();
  }
}
