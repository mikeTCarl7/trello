import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/list';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
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
  // prevSelectedList: List;
  selectedCard: any;

  dropped: any;
  isEdit: any = false;
  closeResult: string;
  card: any;
  public modalRef: NgbModalRef;

  dragOperation: boolean = false;

      cards: Array<any> = [];

  constructor(private svc: ListsService, private modalSvc: NgbModal) { }

    open(content) {
      this.modalRef = this.modalSvc.open(content);
    }
  ngOnInit() {
  }
  toggleIsEdit() {
    this.isEdit = !this.isEdit;
    console.log('isEdit: ', this.isEdit );
  }

  onSubmit(){
    this.selectedCard = this.card;
    console.log(this.selectedCard);
    this.addCardToSelected(this.selectedCard);
    this.modalRef.close();
  }

  addCardToSelected(card) {
    // const card = 'new card';
    console.log(card);
    this.selectedList.cards.push(card);
    this.selectedList.isEdit = true;
    console.log('just dropped card');
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
      this.selectedList.isEdit = false;
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
      console.log('just droped card');

  }

  editCard(event, id, index) {
    console.log(event.target.outerText, id, index);
    this.selectedList.cards[index] = event.target.outerText;
    this.selectedList.isEdit = true;
    // console.log('whut');
    console.log(this.selectedList);
    this.isEdit = true;
  }

  addTo($event: any) {
          if ($event) {
              this.cards.push($event.dragData);
              console.log('about to drop card');
          }
      }
}
