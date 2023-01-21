import { Component, OnInit } from '@angular/core';
import { faAndroid, faAppStoreIos } from '@fortawesome/free-brands-svg-icons';
import { CountriesService } from '../../services/countries/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faAndroid = faAndroid;
  faAppStoreIos = faAppStoreIos;
  allCountries: string[] = [];
  store: string = 'android';
  country: string = '';
  date: string = new Date().toISOString().slice(0, 10);

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    console.log('Here');
    this.countriesService.getCountries().subscribe((data: any) => {
      // Extract the alternate names for each country
      data.forEach((country: any) => {
        this.allCountries.push(country.altSpellings[0]);
      });
    });
  }

  changeCity(event: any) {
    this.country = event.target.value;
  }

  changeDate(event: any) {
    this.date = event.target.value;
  }

  changeStore(type: string) {
    this.store = type;
    console.log(this.store);
  }

}
