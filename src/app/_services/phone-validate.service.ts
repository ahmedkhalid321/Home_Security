import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../_environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidateService {
  constructor(private http: HttpClient) { }

  validatePhoneNumber(phoneNumber: number) {
    const apiUrl = `https://apilayer.net/api/validate?access_key=${environment.apiKeyForPhoneNumberValidation}&number=${phoneNumber}`;
    return this.http.get(apiUrl);
  }
}
