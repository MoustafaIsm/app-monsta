import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoutriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
