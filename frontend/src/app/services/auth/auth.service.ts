import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:5226/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.get(`${URL}/User?email=${email}&password=${password}`);
  }

}
