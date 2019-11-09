import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  authError: any;

  user: firebase.User;

  loginForm: FormGroup;

  constructor(
    private as: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();

    // this.as.eventAuthError$.subscribe(data => {
    //   this.authError = data;
    // });
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  doLogin(formData) {
    console.log(formData);

    this.as.loginUser(formData.value);
  }
}
