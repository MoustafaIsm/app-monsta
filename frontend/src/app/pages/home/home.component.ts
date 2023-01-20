import { Component } from '@angular/core';
import { faAndroid, faAppStoreIos } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faAndroid = faAndroid;
  faAppStoreIos = faAppStoreIos;
  country: string = '';
  date: string = new Date().toISOString().slice(0, 10);

  constructor() { }

  changeCity(event: any) {
    this.country = event.target.value;
  }

  changeDate(event: any) {
    this.date = event.target.value;
    console.log(this.date);
  }

}
