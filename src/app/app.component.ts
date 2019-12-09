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

  constructor(private router: Router, public authService: AuthService, private formBuilder: FormBuilder,) {}

  ngOnInit() {this.initForm();}

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
}
