import { Component, OnInit } from '@angular/core';
import { faAndroid, faAppStoreIos } from '@fortawesome/free-brands-svg-icons';
import { CountriesService } from '../../services/countries/countries.service';
import { AppMonstaService } from 'src/app/services/appMonsta/app-monsta.service';
import { convertStringToArray } from '../../../utilities/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faAndroid = faAndroid;
  faAppStoreIos = faAppStoreIos;
  allCountries: any[] = [];
  store: string = 'itunes';
  country: string = 'US';
  date: string = new Date('2023-1-20').toISOString().slice(0, 10);
  genres: any[] = [];

  constructor(private countriesService: CountriesService, private appMonstaService: AppMonstaService) { }

  ngOnInit() {
    this.countriesService.getCountries().subscribe((data: any) => {
      // Extract the alternate names for each country
      data.forEach((country: any) => {
        this.allCountries.push(country);
      });
    });

    this.getGenres();
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
    this.getGenres();
  }

  getGenres() {
    // App monsta returns the data as string( at least for the timesi  tested it)
    // This API call will fail due to error in parsing to JSON
    // It will be handled in the error part when the status code is 200
    this.appMonstaService.getSpecificGenreNames(this.store, this.date)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        }
      });

  }

}
