import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-consumers",
  templateUrl: "./consumers.component.html",
  styleUrls: ["./consumers.component.css"]
})
export class ConsumersComponent implements OnInit {
  vibers = [];

  constructor(private fs: FirebaseService) {}

  ngOnInit() {
    this.fs.vibers().subscribe(data => {
      this.vibers = data;
    });
  }
}
