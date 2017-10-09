import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/list';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Container} from '../../models/container';
import { Widget } from '../../models/widget';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  lists: Array<List>;
  list: List;
  selectedList: List;
  selectedCard: any;

  dropped: any;
  isEdit: any;
  closeResult: string;

  dragOperation: boolean = false;

  // containers: Array<Container> = [
  //         new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
  //         new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
  //         new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
  //     ];

  //     widgets: Array<Widget> = [];

      cards: Array<any> = [];

  constructor(private svc: ListsService, private modalSvc: NgbModal) { }

    open(content) {
      this.modalSvc.open(content, {windowClass: 'dark-modal'});
    }
  ngOnInit() {
  }

  addCardToSelected(card) {
    // const card = 'new card';
    console.log(card);

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
      this.getLists();
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
        this.getLists();
      });
      console.log('just called delete list');
    }


    getList(id) {
      this.svc.getList(id).subscribe((res) => {
        this.selectedList = res;
        console.log('new selected list ', this.selectedList);
      });
    }

    selectCard(card) {
      this.selectedCard = card;
      console.log(this.selectedCard);

    }

    onItemDrop(e: any) {
      // Get the dropped data here
      console.log(e.dragData.id);
      console.log(e.dragData.card);
      console.log(JSON.stringify(e.dragData[0]));
      this.addCardToSelected(e.dragData[0]);

  }

  onRowClick(event, id) {
    console.log(event.target.outerText, id);
  }




      addTo($event: any) {
          if ($event) {
              this.cards.push($event.dragData);
          }
      }


}
