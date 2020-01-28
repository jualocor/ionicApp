import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

//import { WINDOW } from '../../providers/window.provider';

/**
 * Authentication service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Current user subject
   */
  private currentUserSubject: BehaviorSubject<User>;

  /**
   * Current user
   */
  public currentUser: Observable<User>;

  /**
   * Constructor
   * @param http HTTP client
   * @param window Can allows to obtain base url
   */
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Function to get current user
   * @return currentUser
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  test() {
    return new Promise( resolve => {
      this.http.get("https://jsonplaceholder.typicode.com/todos")
      .subscribe( async resp => {
          resolve(resp);
      }
      )
    })
  }

  /**
   * Function to log a user from backend
   * https://jasonwatmore.com/post/2018/11/16/angular-7-jwt-authentication-example-tutorial#login-component-html
   * @param emailForm email of the user
   * @param passwordForm password of the user
   * @return response
   */
  login(emailForm: string, passwordForm: string) {
    const url = 'http://192.168.202.215:7000/api/v1/login';
    const header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'front-token': 'a8f07ddd7106bc0e57b45c21bf4ff4b45b7aebe80f9771c14e1a8037f527c0fec9fd39f03' +
          'ad1bebfa4a232d8e7d2dbfa097e184105b03a2df4ded012af74c8997bfaa50cdca7d664bf2d44d52edd40' +
          'b6f7493d437f7991c8e9197b1a6450896082c6cbc23460d9f895c46dbd8b9a5e170295218d9369bedeb29' +
          'fcdd0a91c15783818d5138a96ff0faa2704fd067e5a4a05651fcd69c0416f3d0b3118a2ce7b5c128ccacd' +
          '5df4d1d37fc7398c68077d91878814c0c01a8127d47dd6f19209105be8f617b1058b62dd00c71b6f4fd8d' +
          'bdc4b182034e46cd3cc3466c044a48bc472b1bdddba6a33cba126399f166370380f3677584dacc3a6ce2a' +
          '03e92594d96de8'
      }
    );
    const options = { headers: header };

    const body = { email: emailForm, password: passwordForm };
    return new Promise( resolve => {
      this.http.post(url, body, options)
      .subscribe( async resp => {
        if (resp && resp['token']) {
          resolve(resp);
        }
      }
      )
    })
  }

  /**
   * Function to destroy session user
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    this.currentUserSubject.next(null);
  }
}
