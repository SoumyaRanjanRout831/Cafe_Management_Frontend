import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public readonly url = environment.apiUrl;

  constructor( private httpClient: HttpClient) { }

  getDetails(){
    this.httpClient.get(this.url+ "/dashboard/details");
  }
}
