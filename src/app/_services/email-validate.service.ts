import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../_environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailValidateService {

  constructor(private http: HttpClient) { }

  validateEmail(email: string) {
    const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${environment.apiKeyForEmailValidation}&email=${email}`;
    return this.http.get(apiUrl);
  }
}
