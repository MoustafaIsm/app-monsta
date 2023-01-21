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
  allCountries: any[] = [];
  store: string = 'android';
  country: string = 'US';
  date: string = new Date().toISOString().slice(0, 10);

  constructor(private countriesService: CountriesService) { }

  ngOnInit() {
    this.countriesService.getCountries().subscribe((data: any) => {
      // Extract the alternate names for each country
      data.forEach((country: any) => {
        this.allCountries.push(country);
      });
    });
  }

  changeData(typeOfData: string, event: any, store?: string) {
    switch (typeOfData) {
      case 'country':
        this.country = event.target.value;
        break;
      case 'date':
        this.date = event.target.value;
        break;
      case 'store':
        if (store)
          this.store = store;
        break;
    }
  }

}
