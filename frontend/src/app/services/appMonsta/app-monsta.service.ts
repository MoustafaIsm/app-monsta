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

const URL = 'https://api.appmonsta.com/v1/stores';

@Injectable({
  providedIn: 'root'
})
export class AppMonstaService {

  constructor(private http: HttpClient) { }

  getGenres(store: string, country: string, date: string): Observable<any> {
    const result = this.http.get(`${URL}/${store}/rankings/aggregate.json?country=${country}&date=${date}`, httpOptions);
    return result;
  }

  getSpecificGenreNames(store: string, date: string): Observable<any> {
    const result = this.http.get(`${URL}/${store}/rankings/genres.json?date=${date}`, httpOptions);
    return result;
  }

  getAppDetails(store: string, appId: string, country: string) {
    const result = this.http.get(`${URL}/${store}/details/${appId}.json?country=${country}`, httpOptions);
    return result;
  }
}
