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
}
