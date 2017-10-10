import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/list';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


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
  isEdit: any = false;
  closeResult: string;
  card: any;
  name: any;
  position: any;
  public modalRef: NgbModalRef;
  public modalRef2: NgbModalRef;
  showCreateListForm: boolean = false;
  cardEdits: any;
  cardPosition: number;

  dragOperation: boolean = false;

      cards: Array<any> = [];

  constructor(private svc: ListsService, private modalSvc: NgbModal, private newModalSvc: NgbModal) { }

    open(content) {
      this.modalRef = this.modalSvc.open(content);
    }

    openModal(changeCard) {
      this.modalRef2 = this.newModalSvc.open(changeCard);
    }
  ngOnInit() {
    this.getLists();
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
    console.log('isEdit: ', this.isEdit );
  }

  openCreateList () {

    this.showCreateListForm = true;

  }

  onSubmit() {
    this.selectedCard = this.card;
    console.log(this.selectedCard);
    this.addCardToSelected(this.selectedCard);
    this.modalRef.close();
  }

  addCardToSelected(card) {
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
// debugger
    console.log(this.name + ' ' + ' ' + this.position);
      const obj = {
        name: this.name,
        pos: this.position,
        cards: [this.card]
      };
      this.svc.createList(obj).subscribe((res) => {
      console.log(res);
      this.getLists();
      });
      console.log('just tried to create a list');
      this.showCreateListForm = false;
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

    selectCard(card, x) {
      this.selectedCard = card;
      this.cardPosition = x;
      console.log(this.selectedCard);
    }

    onItemDrop(e: any) {
      // Get the dropped data here
      this.addCardToSelected(e.dragData[0]);
      console.log('just droped card');
  }

  editCard(event, id, index) {
    this.selectedList.cards[index] = event.target.outerText;
    this.selectedList.isEdit = true;
    this.isEdit = true;
  }


  editCardFromModal() {
    console.log(this.selectedCard);
    this.modalRef2.close();
    this.selectedList.cards[this.cardPosition] = this.selectedCard;
    this.selectedList.isEdit = true;
  }

  deleteCard() {
    this.selectedList.cards.splice(this.cardPosition, 1);
    this.selectedList.isEdit = true; // turns on the save button
    this.modalRef2.close();

  }

  addTo($event: any) {
          if ($event) {
              this.cards.push($event.dragData);
              console.log('about to drop card');
          }
      }
}
