import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface INews {
  id: number;
  title: string;
  country: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
  favorite?:boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  onGetAll():Observable<INews[]> {
    return this.http.get<INews[]>('https://my-nestjs-news-portal.herokuapp.com/news');
  }
}
