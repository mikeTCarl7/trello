import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { List } from '../models/list';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OshaService {

  constructor(private http: Http) {
    console.log('this got called');
    // this.alertOthers().subscribe(res => console.log(res));
  }



  alertOthers(): Observable<any> {

    return this.http.get('http://localhost:3000/api/osha').map((res) => {
      return res.json();
    });
  }

}
