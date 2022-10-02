import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INews} from "../service.service";

export interface IAuth {
  firstName:string;
  lastName:string;
  login:string;
  password:string;
  id:number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registration(obj:IAuth):Observable<IAuth>{
    return this.http.post<IAuth>('https://my-nestjs-news-portal.herokuapp.com/auth/registration', obj);
  }

  auth(obj:any):Observable<any>{
    return this.http.post<any>('https://my-nestjs-news-portal.herokuapp.com/auth/login', obj);
  }

  favoriteNewws(obj:any):Observable<any>{
    return this.http.post<any>('https://my-nestjs-news-portal.herokuapp.com/users/addNewsToUser', obj);
  }

  getFavoriteNewws():Observable<any> {
    return this.http.get<any>('https://my-nestjs-news-portal.herokuapp.com/users/test11');
  }
  deleteFavoriteNewws(id:number):Observable<any> {
    return this.http.delete<any>('https://my-nestjs-news-portal.herokuapp.com/users/deleteMyNew/' + id);
  }

  createNews(obj:any):Observable<any>{
    return this.http.post<any>('https://my-nestjs-news-portal.herokuapp.com/news', obj);
  }

  editNews(id:number, obj:any):Observable<INews>{
    return this.http.put<INews>('https://my-nestjs-news-portal.herokuapp.com/news/' + id, obj);
  }

}
