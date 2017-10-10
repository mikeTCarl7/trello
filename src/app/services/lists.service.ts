import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { List } from '../models/list';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ListsService {

  constructor(private http: Http) {}


  private extractData(res: Response) {
    const body = res.json();
          return body.data || {};
      }
  private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
  }

  getLists(): Observable<any> {
    return this.http.get('http://localhost:3000/api/lists').map((res) => {
      return res.json();
    });
  }

  getList(id): Observable<any> {
    return this.http.get('http://localhost:3000/api/lists/' + id).map((res) => {
      console.log('single list' + res.json());
      return res.json();
    });
  }

  updateList(list: List) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const input = JSON.stringify(list);
    // constant below is to trim unneaded properties prior to the api call
    const obj: any = {
        name: list.name,
        pos: list.pos,
        cards: list.cards,
        id: list.id
      };
      return this.http.post('http://localhost:3000/api/lists/' + list.id, input, options);
    }

  createList(obj) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const input = JSON.stringify(obj);
      return this.http.post('http://localhost:3000/api/lists', input, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  deleteList(id) {
    return this.http.delete('http://localhost:3000/api/lists/' + id).map(res => res.json());
  }
}
