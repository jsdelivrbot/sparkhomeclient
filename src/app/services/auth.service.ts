import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { JwtHelper } from 'angular2-jwt';

import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  //jwtHelper: JwtHelper = new JwtHelper();

  currentUser = { _id: '', username: '', role: '' };

  constructor(private apiService: ApiService,
    private router: Router) {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedUser = this.decodeUserFromToken(token);
    //   this.setCurrentUser(decodedUser);
    // }
  }


  login(emailAndPassword) {
    console.log("res : " + emailAndPassword)
    return this.apiService.login(emailAndPassword).map(res => res.json()).map(
      res => {
        console.log("res : " + res)
        // localStorage.setItem('token', res.token);
        // const decodedUser = this.decodeUserFromToken(res.token);
        // this.setCurrentUser(decodedUser);
        //return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', username: '', role: '' };
    this.router.navigate(['/']);
  }

  //   decodeUserFromToken(token) {
  //     return this.jwtHelper.decodeToken(token).user;
  //   }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
  }

}