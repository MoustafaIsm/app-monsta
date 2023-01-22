import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AppMonstaService } from 'src/app/services/appMonsta/app-monsta.service';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css']
})
export class GenreCardComponent implements OnInit {
  @Input() genre: any;
  @Input() store: string = '';
  pictureURL: string = '/images/placeholder.png';

  constructor(private appMonstaService: AppMonstaService) {

  }

  ngOnInit(): void {
    this.appMonstaService.getFirstAppOfGenre(this.store, this.genre.ranks[0], 'US').subscribe({
      next: (data: any) => {
        this.pictureURL = data.screenshot_urls[0];
        console.log(this.pictureURL);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
