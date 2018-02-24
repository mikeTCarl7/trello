import { Component, OnInit } from '@angular/core';

import {OshaService} from '../../services/osha.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {

  constructor(private svc: OshaService) {
    // this.svc.alertOthers();
    // console.log('we are here');
   }

  ngOnInit() {
  }
  alertOthers() {
    this.svc.alertOthers().subscribe(res => console.log(res));
  }

}
