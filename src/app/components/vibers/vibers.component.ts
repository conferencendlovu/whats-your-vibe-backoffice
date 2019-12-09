import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

@Component({
  selector: "app-vibers",
  templateUrl: "./vibers.component.html",
  styleUrls: ["./vibers.component.css"]
})
export class VibersComponent implements OnInit {
  vibers = [];
  available = false;

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.displayVibers();
  }

  private displayVibers() {
    this.service.vibers().subscribe(vibersList => {
      this.vibers = [];

      vibersList.forEach(a => {
        const viber: any = a.payload.doc.data();

        viber.id = a.payload.doc.id;

        this.vibers.push(viber);
      });

      if (this.vibers.length > 0) {
        this.available = true;
        console.log(this.vibers);
      } else {
        this.available = false;
      }

      // this.spinner.hide();
    });
  }
}
