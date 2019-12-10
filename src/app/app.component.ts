import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Whats Your Vibe - Administration Console 0.0.1";
  loginForm: FormGroup;
  errorMessage = null;
  loading = false;
  buttonText = "LOGIN";
  user: firebase.User;

  constructor(
    private router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authService.getUserState().subscribe(user => {
      this.user = user;
    });
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  doLogout() {
    this.authService.doLogout();
  }

  onSubmit(formData) {
    this.buttonText = "LOGING IN... PLEASE WAIT";
    this.loading = true;
    this.errorMessage = null;
    this.authService
      .doLogin(formData)
      .then(data => {
        if (data) {
          console.log(data);
          this.loading = false;
          this.buttonText = "LOGIN";
          // this.authService.uid = data.user.uid.toString()
        } else {
          console.log("no data");
          this.buttonText = "LOGIN";
          this.loading = false;
        }
      })
      .catch(err => {
        this.buttonText = "LOGIN";
        console.log(err.message);
        this.loading = false;
        this.errorMessage = err.message;
      });
  }
}
