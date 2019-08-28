import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  businessUsers = [];

  constructor(private service: FirebaseService) { }

  ngOnInit() {

    this.service.businessUsers().subscribe(data => {

        this.businessUsers = data;

    })

  }

}
