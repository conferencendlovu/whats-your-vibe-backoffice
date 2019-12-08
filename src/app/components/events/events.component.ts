import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../../services/firebase.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  events = [];

  searchText = "";

  p = 1;

  available = false;

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.displayEvents();
  }

  private displayEvents() {
    this.service.events().subscribe(ordersList => {
      this.events = [];

      ordersList.forEach(a => {
        const event: any = a.payload.doc.data();

        event.id = a.payload.doc.id;

        this.events.push(event);
      });

      if (this.events.length > 0) {
        this.available = true;
        console.log(this.events);
      } else {
        this.available = false;
      }

      // this.spinner.hide();
    });
  }

  private deleteSingleEvent(id) {}

  private editEvent(id) {}

  private toogleEventStatus(id) {}

  private createEvent() {}
}
