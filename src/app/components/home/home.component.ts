import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  totalVibers = 0;

  totalEvents = 0;

  totalBusiness = 0;

  constructor(private fs: FirebaseService) {}

  ngOnInit() {
    this.fs.getTotalBusiness().subscribe(data => {
      this.totalBusiness = data.length;
    });

    this.fs.getTotalVibers().subscribe(data => {
      this.totalVibers = data.length;
    });

    this.fs.getTotalEvents().subscribe(data => {
      this.totalEvents = data.length;
    });
  }
}
