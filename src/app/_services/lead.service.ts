import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { environment } from '../_environment/environment';
import { Lead } from '../_interfaces/LeedDetail';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http:HttpClient) { }

  _addLeadDetail(data:FormData):Observable<Lead> {
    return this.http.post<Lead>(`${environment.BASEURL}`,data);
  }
}
