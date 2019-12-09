import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: "app-businesses",
  templateUrl: "./businesses.component.html",
  styleUrls: ["./businesses.component.css"]
})
export class BusinessesComponent implements OnInit {
  businessUsers = [];
  available = false;

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.displayBusinessAccounts();
  }

  private displayBusinessAccounts() {
    this.service.businessUsers().subscribe(businessAccountsList => {
      this.businessUsers = [];

      businessAccountsList.forEach(a => {
        const business: any = a.payload.doc.data();

        business.id = a.payload.doc.id;

        this.businessUsers.push(business);
      });

      if (this.businessUsers.length > 0) {
        this.available = true;
        console.log(this.businessUsers);
      } else {
        this.available = false;
      }

      // this.spinner.hide();
    });
  }
}
