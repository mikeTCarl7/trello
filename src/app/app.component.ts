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

  lists: Array<List>;
  list: List;
  selectedList: List;

  constructor(private svc: ListsService) {

  }

  ngOnInit() {

    // this.svc.createList();
  }
  addCardToSelected() {
    const card = 'new card';

    this.selectedList.cards.push(card);
  }

  selectList(list: List) {
    this.selectedList = list;
    console.log(this.selectedList.id);
    console.log(JSON.stringify(this.selectedList.cards));
  }

  createList() {
      this.svc.createList().subscribe((res) => {
      console.log(res);
      });
      console.log('just tried to create a list');
    }

    getLists() {
      this.svc.getLists().subscribe(res => {
        this.lists = res.rows;
        console.log(this.lists);
        console.log(res);
      });
    }

    updateList(list: List) {
      console.log('list id: ' + list.id + 'is about to be updated');
      this.svc.updateList(list).subscribe((res) => {
        console.log(res);
        this.getList(list.id);
      });
      // this.getList(list.id);
      console.log('just tried to update list');
    }

    deleteList(id) {
      this.svc.deleteList(id).subscribe((res) => {
        console.log(res);
      });
      console.log('just called delete list');
    }
    getList(id) {
      this.svc.getList(id).subscribe((res) => {
        this.selectedList = res;
        console.log('new selected list ', this.selectedList);
      });
    }
}
