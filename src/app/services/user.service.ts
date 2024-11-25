import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  signUp(data: any) {
    return this.httpClient.post(`${this.url}/user/signup`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  forgotPassword(data: any) {
    return this.httpClient.post(`${this.url}/user/forgotPassword`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
