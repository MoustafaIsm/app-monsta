import { Component, OnInit } from '@angular/core';
import { faAndroid, faAppStoreIos } from '@fortawesome/free-brands-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  faSpinner = faSpinner;
  allCountries: any[] = [];
  store: string = 'itunes';
  country: string = 'US';
  date: string = new Date('2023-1-22').toISOString().slice(0, 10);
  genres: any[] = [];
  agregatedGenres: any[] = [];
  spesificGenreNames: any[] = [];

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

    // Get agregate data for all genres
    this.appMonstaService.getGenres(this.store, this.country, this.date)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          if (error.status === 200) {
            this.agregatedGenres = convertStringToArray(error.error?.text);
            // Get specific genre names
            this.appMonstaService.getSpecificGenreNames(this.store, this.date)
              .subscribe({
                next: (data: any) => {
                  console.log(data);
                },
                error: (error: any) => {
                  if (error.status === 200) {
                    this.spesificGenreNames = convertStringToArray(error.error?.text);
                    this.genres = this.manipulateData(this.agregatedGenres, this.spesificGenreNames);
                  }
                }
              });

          }
        }
      });

  }

  manipulateData(aggregated: any[], names: any[]): any[] {
    // Check if both arrays are populated
    if (aggregated.length > 0 && names.length > 0) {
      // Loop through the aggregated data
      aggregated.forEach((genre: any) => {
        // Loop through the names
        names.forEach((name: any) => {
          // Check if the id's match
          if (genre.genre_id === name.genre_id) {
            // Add the name to the genre object
            genre.name = name.name;
          }
        });
      });
      // Remove duplicates
      aggregated = aggregated.filter((genre: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.genre_id === genre.genre_id
        ))
      );
      return aggregated;
    }
    return [];
  }

}
