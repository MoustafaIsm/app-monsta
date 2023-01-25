import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Buffer } from 'buffer';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + Buffer.from(`${environment.appMonsta.username} : ${environment.appMonsta.password}`).toString('base64')
  })
};

const URL = 'http://localhost:5226/api';

@Injectable({
  providedIn: 'root'
})
export class AppMonstaService {

  constructor(private http: HttpClient) { }

  getGenres(store: string, country: string, date: string): Observable<any> {
    const result = this.http.get(`${URL}/Genre?store=${store}&country=${country}&date=${date}`, httpOptions);
    return result;
  }

  getSpecificGenreNames(store: string, date: string): Observable<any> {
    const result = this.http.get(`${URL}/Genre/GetSpecificNames?store=${store}&date=${date}`, httpOptions);
    return result;
  }

  getAppDetails(store: string, appId: string, country: string): Observable<any> {
    const result = this.http.get(`${URL}/App?store=${store}&appId=${appId}&country=${country}`, httpOptions);
    return result;
  }

  getPublisherName(store: string, date: string): Observable<any> {
    const result = this.http.get(`${URL}/App/getPublishers?store=${store}&date=${date}`, httpOptions);
    return result;
  }
}
