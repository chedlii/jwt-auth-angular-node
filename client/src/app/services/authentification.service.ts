import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

import { User } from '../models/user'

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _registerUrl = "http://localhost:3000/api/users/register"
  private _loginUrl = "http://localhost:3000/api/users/login"
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser



  constructor(private http: HttpClient, private router: Router) { }



  register(user): Observable<any> {

    return this.http.post<any>(this._registerUrl, user)


  }


  login(user): Observable<any> {

    return this.http.post<any>(this._loginUrl, user)
      .pipe(map(userInfo => {


        console.log(userInfo)
        localStorage.setItem('token', userInfo.token)
        console.log(localStorage.getItem('token'))
        // this.currentUserSubject.next(user);
        // return user;
        console.log(userInfo.user)
        this.currentUser = userInfo.user


      }))



  }



  logout() {

    localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }



  //verify if token exist in the local storage
  loggedIn() {

    if (localStorage.getItem('token')) {

      return true
    } else {
      return false
    }
  }


  getToken() {

    return localStorage.getItem('token')
  }
}
