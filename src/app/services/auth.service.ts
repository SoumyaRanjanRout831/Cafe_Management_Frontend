import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }

  public isAuthenticated(): boolean{
    const token = localStorage.getItem('accessToken');
    if(!token){
      this.route.navigate(["/"]);
      return false;
    }else{
      return true;
    }
  }
}
