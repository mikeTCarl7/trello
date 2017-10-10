import { Component, OnInit } from '@angular/core';

import { ListsService } from './services/lists.service';
import { List } from './models/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
  }
 
}
