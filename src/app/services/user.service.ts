import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly url = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  /**
   * User Sign Up
   * @param data - Sign Up form data
   */
  signUp(data: any) {
    return this.httpClient.post(`${this.url}/user/signup`, data, {
      headers: this.headers,
    });
  }

  /**
   * Forgot Password
   * @param data - Email address for password reset
   */
  forgotPassword(data: any) {
    return this.httpClient.post(`${this.url}/user/forgotPassword`, data, {
      headers: this.headers,
    });
  }

  /**
   * User Login
   * @param data - Login form data (e.g., email and password)
   */
  login(data: any) {
    return this.httpClient.post(`${this.url}/user/login`, data, {
      headers: this.headers,
    });
  }
}
