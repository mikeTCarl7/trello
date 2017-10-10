import { Injectable } from '@angular/core';

// import { Injectable } from '@angular/core';
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
    let body = res.json();
    // console.log(body.data);
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

  getList(id) : Observable<any> {
    return this.http.get('http://localhost:3000/api/lists/' + id).map((res) => {
      console.log('single list' + res.json());
      return res.json();
    });
  }

  updateList(list: List) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const input = JSON.stringify(list);
    //constant below is to trim unneaded properties prior to the api call
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
    // console.log(list.rows[0]);
    // let n = 'mike';
    // let p = 2;
    // const obj: any = {name: n,
    //   pos: p,
    //   cards: ['card1', 'card2']
    // };

    const input = JSON.stringify(obj);

    // console.log();
    let me1 = '{"name":"Hello","pos":1,"cards":["Card 1","Card 2"]}';
    let me = '{"rows":[{"name":"Hello","pos":1,"cards":["Card 1","Card 2"]]}';
    // console.log(JSON.stringify(obj) + ' is the object value');
      return this.http.post('http://localhost:3000/api/lists', input, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  deleteList(id) {
    return this.http.delete('http://localhost:3000/api/lists/' + id).map(res => res.json());
  }
}
