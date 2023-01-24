import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
  @Input() date: string = '';
  pictureURL: string = 'assets/images/placeholder.png';

  constructor(private router: Router, private appMonstaService: AppMonstaService) {

  }

  ngOnInit(): void {
    this.appMonstaService.getAppDetails(this.store, this.genre.ranks[0], this.genre.country).subscribe({
      next: (data: any) => {
        this.pictureURL = data.screenshot_urls[0];
      }
    });
  }

  goToGenre() {
    const navigationExtras: NavigationExtras = {
      state: {
        genre: this.genre,
        store: this.store,
        date: this.date
      }
    };
    this.router.navigate(['/home/genre'], navigationExtras);
  }

}
