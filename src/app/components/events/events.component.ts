import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private service: FirebaseService) { }

  ngOnInit() {

    this.service.events().subscribe( data => {
      console.log(data);

      this.events = data;

    });

  }

}
